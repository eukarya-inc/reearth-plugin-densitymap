# Heatmap プラグイン

<img width="1383" alt="WX20220809-171914@2x" src="https://github.com/eukarya-inc/reearth-plugin-geotagging/assets/13118515/bf3ef037-9c7f-4bab-9249-bb845462fdac">

## このプラグインについて
- マップ上のポイントデータの密度に応じて指定した色のヒートマップを表示します。
- ポイントデータの読み込みはcsvデータセット及びgeojsonに対応しています。
　
## 使用方法
### 右パネルの設定項目
- Dataタブ<br>
  ヒートマップを作成するポイントデータを指定します。

    ![](https://github.com/eukarya-inc/reearth-plugin-geotagging/assets/13118515/7661f67b-bc65-46d5-9e20-e0f6b365d332)


  - Geojson Fileからポイントデータを指定する場合
    ![](https://github.com/eukarya-inc/reearth-plugin-densitymap/assets/13118515/a02150ca-b661-4106-b1f2-187f58858b63)
    ポイントデータのgeojsonファイルに対してヒートマップを作成する場合は、以下の手順で設定します。ヒートマップが作成されるのはポイントデータのgeojsonに限ります。
    ①Geojson Fileの項目をクリックします。
    ②アセットの選択画面でポイントデータのgeojsonファイルを選択します。
    ③選択ボタンをクリックします。
    



  - Re:Earthに追加しているマーカーからヒートマップを作成する場合
    Tag Nameに任意のタグを指定します。
    ![](https://github.com/eukarya-inc/reearth-plugin-densitymap/assets/13118515/27d17d46-9048-4ac9-adbb-a77d162f78c6)
    
    ①ヒートマップを作成するレイヤをクリックします。
    ②右パネルのタグをクリックします。
    ③タグに任意の文字列のタグを設定します。
    ④ウィジェットからDencity mapをクリックします
    ⑤tag nameにレイヤーに指定したタグと同じ文字列を入力します。





- 密度タブ <br>
  位置データの密度と表示色の対応リストを作成します。リストを追加する時には”+”ボタンを押します。
  - ①＋ボタンをクリックし、リストを追加します。
  - ②"Minimum Number of points" ：ポイント数の区切りを指定します。その色で表示する最小のポイントの数を入力してください。
  - ③"Color"：表示色を指定します。
  - ④"Text"：凡例として表示する文字を入力します。<br>

  ![](https://github.com/eukarya-inc/reearth-plugin-densitymap/assets/13118515/385af774-6851-4017-a2a2-62f61670f5a7)

上の図の場合、ポイント数が「Minimum Number of points」で指定した5から、次の区切りの数値の手前（9）までの時に、水色(#83c5e8ff)で表示されます。

密度リストには密度が低い方から高い方に順に指定してください。
  <密度リスト指定例> <br>
  | 密度リストNo | Minimum Number of points | 表示範囲 |
  | :----------: | :----------------------: | :------: |
  |      1       |            1             |  1 - 3   |
  |      2       |            4             |  4 - 6   |
  |      3       |            7             |  7 - 9   |
  |      4       |            10            | 10 以上  |
  |              |                          |


- Settingタブ <br>
  Explanation スイッチをOnにすると密度リストで指定した色とテキストを凡例画面に表示することができます。<br>
    ![](https://github.com/eukarya-inc/reearth-plugin-geotagging/assets/13118515/bf1ec882-1331-44a1-9ddb-65ef1c6f1d43)
  
  <凡例の表示例>

    ![](https://github.com/eukarya-inc/reearth-plugin-geotagging/assets/13118515/b545824a-9029-459f-9811-803bf0340298)

    
### 操作方法
 上記のDataタブで指定したデータやタグがついているレイヤに対してヒートマップを作成します。
 

### 留意点
- 密度を計算する領域は相対値です。カメラのズームによって領域のサイズは変化します。地図を拡大すると密度計算の領域は狭くなり、ポイントの密度は低下します。また、それに伴って表示色も変化します。
- データ量が多いと密度計算に時間がかかります。カメラのZoomを変更した時も密度の再計算が必要になるので、データー量によって画面更新に時間を必要とします。<br>

    - 描画時間の参考値<br>
    
    | 表示データ数 | 画面更新時間(秒) |
    | -----------: | :--------------: |
    |        1,000 |       1.5        |
    |       10,000 |        45        |
    |              |                  |

    - 測定環境 <br>
    ・使用マシン：　MacBook Pro 13-inch, M1, 2020  RAM 16GB <br>
    ・ブラウザ：　Chrome 112.0.5615.121

## 備考
- データの作成と読み込み
  - geojson
    
    ファイルの構成は以下の例を参考にしてください。

    ``` 
    <geojsonの例>
    {
      "type": "FeatureCollection",
      "name": "TrafficAccident",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features": [
        { "type": "Feature", "properties":{}, "geometry": { "type": "Point", "coordinates": [130.7239041,33.7443480]}},
        { "type": "Feature", "properties":{}, "geometry": { "type": "Point", "coordinates": [130.3270356,33.5784]}}
      ]
    }
    ```
    作成したgeojsonファイルを右パネルの Geojson File で指定して読み込みます。

  - csv

    識別子、緯度、軽度の順にカンマで区切って記述します。１行目にヘッダーを記述してください。１カラム目の識別子は任意のもので構いません。例ではシリアル番号を付与しています。
    
    ```
    <csvの例>
    ID,lat,lng
    1,33.74434808,130.7239041
    2,33.57849,130.3270356
    3,33.572459,130.2753378
    4,33.60089019,130.4491108
    5,33.84628358,130.7278219
    ```
    左パネルの ”データーセットを追加” でcsvファイルを読み込みます。ファイルが正常に読み込めたら右パネルメニューにデータが表示されます。追加するレイヤーを選択してインポートを押すとレイヤーが作成されます。下の例ではマーカーレイヤーを作成しています。

    ![](https://github.com/eukarya-inc/reearth-plugin-geotagging/assets/13118515/6fb852c0-2b68-42d0-88af-c9d08d071429)

    マーカーなどのレイヤーとして読み込んだ時には、対応するシンボルが表示されます。シンボル表示が不要な場合はレイヤの表示・非表示アイコンをクリックすることで非表示にできます。

    ![](https://github.com/eukarya-inc/reearth-plugin-geotagging/assets/13118515/1a1db97c-f251-419b-a954-41ac56f20b97)

- ヒートマップの表示

  右パネルで密度リストを作成し、表示データの読み込みに成功すると自動的にヒートマップが表示されます。


- テストブラウザ環境
  - OS:Mac OS Montery 12.6.5
  - ブラウザ：Google Chrome 112.0.5615.121

## 開発者欄

このプラグインは、Re:Earth公式プラグインです。

 ![](https://github.com/eukarya-inc/reearth-plugin-geotagging/assets/13118515/04993845-2c1f-43db-89e9-00bb477ce21d)

ソースコードはこちら(https://github.com/eukarya-inc/reearth-plugin-modelgenerator

本プラグインを使用したサンプルページは以下から閲覧することができます。
https://heatmap-plugin-sample.reearth.io

- コミュニティ

  - このプラグインを利用したプロジェクトをユーザーコミュニティでシェアしましょう。

  - このプラグインについての不明点がある場合にもここからRe:Earthチームや他の開発者に質問することができます。

  - Discordへのリンクはこちら(https://discord.gg/BXcQhvwqqM)
