const html = `
<style>
  @font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2) format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/notosans/v27/o-0IIpQlx3QUlC5A4PNr5TRASf6M7Q.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  body,html {
    margin: 0;
  }

  #wrapper {
    width: 100%;
    height: 100%;
    max-height: 200px;
    max-width: 290px;
    color: white;
    display: none;
  }

  #title {
    font-family: "Noto Sans" !important;
    font-size: 20px;
    margin-left: 16px;
  }

  input[type=file] {
    display: none;
  }

  input[type=file]::file-selector-button:hover {
    background: #0d45a5;
  }

  #hanrei-section::-webkit-scrollbar {
   display: none;
  }

  #hanrei-section {
    padding-left: 10px;
    padding-bottom: 10px;
    padding-top: 2px;
    background: #171618;
    border-radius: 5px;
    max-height: 185px;
    overflow: scroll;
  }

  #close-hanrei {
    float: right;
    margin-top: 4px;
    margin-right: 15px;
    cursor: pointer;
  }

  #plugin-icon {
    display: none;
    cursor: pointer;
  }

  #hanrei-table{
    font-family: "Noto Sans" !important;
    font-size: 14px;
  }

  .square {
    height: 20px;
    width: 20px;
    background-color: #bbb;
    border-radius: 50%;
  }

  #hanrei-div {
    display: none;
  }

  #hanrei {
    margin-top: 12px;
  }

  #hanrei {
    margin-top: 12px;
  }

  #hanrei-item {
    height: 30px;
  }


  .hanrei-label {
    padding-left: 10px;
  }

</style>
<div id="wrapper">
  <div id="plugin-icon" onClick="openPlugin()">
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="4" fill="#171618"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8126 19.5001H17.9376C17.9908 19.5001 18.0432 19.4865 18.0897 19.4605C18.1362 19.4346 18.1753 19.3972 18.2033 19.3519C18.2313 19.3066 18.2473 19.2549 18.2497 19.2017C18.2521 19.1485 18.2409 19.0956 18.2171 19.0479L16.6546 15.9088C16.6257 15.8604 16.5848 15.8203 16.5358 15.7925C16.4868 15.7646 16.4314 15.75 16.375 15.75C16.3187 15.75 16.2633 15.7646 16.2143 15.7925C16.1653 15.8203 16.1243 15.8604 16.0955 15.9088L14.533 19.0478C14.5092 19.0955 14.4979 19.1484 14.5003 19.2017C14.5027 19.2549 14.5187 19.3066 14.5467 19.3519C14.5747 19.3972 14.6138 19.4346 14.6604 19.4606C14.7069 19.4865 14.7593 19.5001 14.8126 19.5001ZM30.75 17.0002H22V18.2502H30.75V17.0002ZM15.125 24.5002H17.625C17.9702 24.5002 18.25 24.78 18.25 25.1252V27.6252C18.25 27.9703 17.9702 28.2502 17.625 28.2502H15.125C14.7799 28.2502 14.5 27.9703 14.5 27.6252V25.1252C14.5 24.78 14.7799 24.5002 15.125 24.5002ZM22 25.7502H30.75V27.0002H22V25.7502Z" fill="#C7C5C5"/>
    </svg>
  </div>
  <div id="hanrei-section">
    <div id="hanrei">
      <span id="title">凡例</span>
      <span id="close-hanrei" onClick="closePlugin()">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.625 4.375L4.375 15.625" stroke="#C7C5C5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.625 15.625L4.375 4.375" stroke="#C7C5C5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>          
      </span>
      <table id="hanrei-table">
      </table>
    </div>
    <div class="hanrei-div" id="hanrei-div" >
      <table id="table-abc">
      <tr class="hanrei-item" id="hanrei-item">
        <td class="hanrei-icon"><div class="square"></div></td>
        <td class="hanrei-label">Label</td>
      </tr>
      </table>
    </div>
  </div>
</div>

<script src='https://unpkg.com/@turf/turf@6/turf.min.js'></script>
<script>

  let expanded = false
  let reearth, property;
  let layerId;
  let onExplanation = false;
  let oldDensityList;
  let pointsData;
  let isUpdateDensityMap = true;
  let oldRadius;
  let defaultDensityList = [
    { "minNumber" : 1, 
      "color": "#FFFFFF", //white
      "text": "Default"
    }
  ]
  let dataImportProperty
  let settingsProperty
  let oldTagsSelectedLayer
  let densityRange = handleDensityRange(defaultDensityList) ; 
  let tempLayerArr = []
  
  parent.postMessage({ action: "initWidget", }, "*");

  window.addEventListener("message", e => {
    if (e.source !== parent) return;
    reearth = e.source.reearth;
    
    if (e.data.property) {
      property = e.data.property
    } 

    if(e.data.type == "selectLayer" && dataImportProperty?.tagName && reearth.layers.selected) { 
      let tagName = dataImportProperty.tagName
      let selectedLayer = reearth.layers.selected
      let elmInArr = tempLayerArr.find(obj => obj.id == selectedLayer.id)
      if(!elmInArr) {
        tempLayerArr.push({
          "id" : selectedLayer.id, 
          "hasTagName": isLayerHasTag(selectedLayer, tagName)
        })
      } else {
        if(elmInArr.hasTagName != isLayerHasTag(selectedLayer, tagName)) {
          let elmId = tempLayerArr.findIndex(obj => {
            return obj.id == selectedLayer.id;
          });
          handleShowingDensityMap(dataImportProperty)
          tempLayerArr[elmId].hasTagName = isLayerHasTag(reearth.layers.selected, tagName)
        }
      }
    } else
    if(e.data.type == "initWidget") {
      //init widget

      //Handle density list
      if (property?.densityList) {
        densityRange = handleDensityRange(property.densityList) 
      } else {
        densityRange = handleDensityRange(defaultDensityList) 
      }
      oldDensityList = property?.densityList

      //Handle points data
      handleShowingDensityMap(property?.default)
    } else {

      // Update density map when data input is changed
      if(dataImportProperty != property?.default) {
        let differences = getObjectDiff(dataImportProperty, property?.default)
        if (JSON.stringify(differences) === '{}') {
          handleShowingDensityMap(property.default)
        } else {
          if(differences.hasOwnProperty("url") ||
            differences.hasOwnProperty("tagName")) {
              handleShowingDensityMap(property.default)
          }
        }
        dataImportProperty = property.default
      }

      // Handle density list
      if (oldDensityList != property?.densityList) {
        let differences = getObjectDiff(oldDensityList, property?.densityList)
        if (JSON.stringify(differences) === '{}') {
          densityRange = handleDensityRange(defaultDensityList) 
          isUpdateDensityMap = true
        } else {
          // Density map will be updated only when changing the "min number" field and "color" field
          for (let elm in differences) {
            if(differences[elm].hasOwnProperty("minNumber") || 
              differences[elm].hasOwnProperty("color")) {
              isUpdateDensityMap = true
            }
          }
          densityRange = handleDensityRange(property.densityList) 
        }
        if(isUpdateDensityMap) {
          let cameraHeight = reearth.camera.position.height
          let geojsonData = generateClusterLayer(pointsData, cameraHeight)
          layerId = displayGeojson(layerId, geojsonData)
          isUpdateDensityMap = false;
        }
        oldDensityList = property?.densityList
      }
       
        
      // Update density map when moving camera
      let newRadius = getRadusPoint(reearth.camera.position.height);
      if(e.data.type == "cameradata" ) {
        if (oldRadius != newRadius) {
          oldRadius = newRadius
          if(!isMovingCamera){
            if(intervalId == 0) {
              console.log("Please wait for loading data ...")
              intervalId = setInterval(function() {
                newCamera = JSON.stringify(reearth.camera.position)
                if (newCamera != oldCamera) {
                  //Update map
                  isMovingCamera = true;
                  oldCamera = newCamera
                } else {
                  isMovingCamera = false
                  clearInterval(intervalId);
                
                  let cameraHeight = reearth.camera.position.height
                  let geojsonData = generateClusterLayer(pointsData, cameraHeight)
                  layerId = displayGeojson(layerId, geojsonData)
                  console.log("Updated map")
                  intervalId = 0;
                }
              }, 500);
            }
          }
        }
      } else {
        // Handle explanation table
        if(property?.setting?.explanation) {
          document.getElementById("wrapper").style.display = "block"
          let tableElm = document.getElementById("hanrei-table");
          tableElm.innerHTML = "";
          let tempHanrei = document.getElementById("hanrei-item");
          property?.densityList.map((obj) => {
            let cloneHanrei = tempHanrei.cloneNode(true);
            cloneHanrei.querySelector(".hanrei-icon").querySelector(".square").style.backgroundColor = obj.color ? obj.color : "#FFFFFF"
            cloneHanrei.querySelector(".hanrei-label").innerText = obj.text ? obj.text : ""
            tableElm.appendChild(cloneHanrei);
          })
          
          openPlugin()
        } else {
          document.getElementById("wrapper").style.display = "none"
          parent.postMessage({ type: "resize", expanded: false }, "*");
        }
      }
    }
  });

  let isMovingCamera = false;
  let intervalId = 0;
  let oldCamera, newCamera;

  // Handle Update IFrame Size
  function updateIframeSize() {
    let heightWp = document.getElementById("wrapper").offsetHeight;
    parent.postMessage({ type: "resize", expanded: true, heightWp, widthWp : 290 }, "*");
  }

  function displayGeojson(reearthLayerId, geojson) {
    if (reearthLayerId) {
      // refresh
      reearth.layers.overrideProperty(reearthLayerId, {
        default: {
          url: [],
        },
      });

      // override
      reearth.layers.overrideProperty(reearthLayerId, {
        default: {
          url: geojson,
        },
      });
      
    } else {
      // add new layer
      reearthLayerId = reearth.layers.add({
        extensionId: "resource",
        isVisible: true,
        title: "Density Map",
        property: {
          default: {
            url: geojson,
            type: "geojson",
          },
        },
      });
    }
    return reearthLayerId;
  }

  async function handleShowingDensityMap(data) {
    let geoPoints = [];
    let coord = [];
    let maxNumberOfPoints = 15000;
    let numberOfPoints = 0;

    //Handle layers with input tag name
    if (data?.tagName) {
      let tagName = data.tagName;
      let allLayersByTagName = getAllLayersByTag(tagName)
      allLayersByTagName?.map((layer, index) => {
        if (layer.children) {
          layer.children?.map(obj => {
            if (obj.property?.default?.location) {
              coord = [
                obj.property.default.location.lng, 
                obj.property.default.location.lat
              ]
            } else if (obj.property?.default?.position) {
              coord = [
                obj.property.default.position.lng, 
                obj.property.default.position.lat
              ]
            }
            if (coord) {
              geoPoints.push(turf.point(coord))
            }
          })
        } else {
          if (layer.property?.default?.location) {
            coord = [
              layer.property.default.location.lng, 
              layer.property.default.location.lat
            ]
          } else if (layer.property?.default?.position) {
            coord = [
              layer.property.default.position.lng, 
              layer.property.default.position.lat
            ]
          }
          if (coord) {
            geoPoints.push(turf.point(coord))
          }
        }
      })
    }

    //Handle data of geojson file
    if (data?.url) {
      numberOfPoints = 0;
      await fetch(data.url).then(response => response.json())
        .then(data => {
          data.features.forEach(obj => {
            numberOfPoints++
            if(numberOfPoints < maxNumberOfPoints) {
              coord = [obj.geometry.coordinates[0],obj.geometry.coordinates[1]]
              geoPoints.push(turf.point(coord))
            }
          })
        });
    }

    pointsData = turf.featureCollection(geoPoints)
    let cameraHeight = reearth.camera.position.height
    let geojsonData = generateClusterLayer(pointsData, cameraHeight)
    layerId = displayGeojson(layerId, geojsonData)
  }

  function createCluster(points, maxDistance) {
    let clustered = turf.clustersDbscan(points, maxDistance);
    return {cluster, totalClusterd};
  }

  function createColorPoint(radius, coord, color) {
    let result = []
    let pointGeo = turf.point(coord);
    let options = {units: 'kilometers'};
    let options2 = {steps: 8, units: 'kilometers', };
    let circle = turf.circle(coord, radius, options2);
    circle.properties["fill"] = color
    circle.properties["fill-opacity"]= 0.4;
    circle.properties["stroke-opacity"]= 0;
    result.push(circle)
    let circleInside = turf.transformScale(circle, 0.7);
    circleInside.properties["fill-opacity"]= 1;
    result.push(circleInside)
    return result;
  }
  


  function generateClusterLayer(points, cameraHeight) {
    if (!points) return;
    //Maximum Distance between any point to generate the clusters
    let maxDistance = parseFloat(cameraHeight) * 0.02 / 1000;
    maxDistance = Number((maxDistance).toFixed(2))
    if (maxDistance > 55) {
      maxDistance = 55
    }
    
    let options = {units: 'kilometers', mutate: false};
    let clustered = turf.clustersDbscan(points, maxDistance, options);
    let pointsWithoutClustered = []
    let featureArr = []
    let singlePointArr = []

    // Handle points not in any cluster
    clustered.features.forEach(obj => {
      if(!obj.properties.hasOwnProperty("cluster")){
        // featureArr.push(...createSingleHeatPoint(obj.geometry.coordinates, cameraHeight))
        singlePointArr.push(obj.geometry.coordinates)
      }
    })

    if (singlePointArr.length > 0) {
      featureArr.push(...hanleSinglePointArr(singlePointArr))
    }

    // Handle points in each clusters
    let valuesCluster = []
    turf.clusterEach(clustered, 'cluster', function (cluster, clusterValue) {
      valuesCluster.push(clusterValue);
    });


    valuesCluster.forEach(clusterId => {
      let clusterElms = turf.getCluster(clustered, {cluster: parseInt(clusterId)})
      let numberPoints = clusterElms.features.length
      let polygonPoints = []
      clusterElms.features.forEach(obj => {
        polygonPoints.push(obj.geometry.coordinates)
      })
      featureArr.push(...createPolygonLayer(polygonPoints))
    })

    //handleClusterByDensityList(valuesCluster, clustered);
    return turf.featureCollection(featureArr)
  }

  function createPolygonLayer(pointArr) {
    let result =[];
    let radius = getRadusPoint(reearth.camera.position.height)
    let numberOfPoints = pointArr.length
    let colorDensity = getColorDensity(numberOfPoints, densityRange)
    let outArr = []
    let inArr = []
    let circleOptions = {steps: 8, units: 'kilometers'};

    pointArr.map(obj => {
      let circle = turf.circle(obj, radius, circleOptions);
      outArr.push(circle)
      let circleInside = turf.transformScale(circle, 0.7);
      inArr.push(circleInside)
    })

    let featuresOutside = turf.featureCollection(outArr)
    let featuresInside = turf.featureCollection(inArr)

    try {
      let dissolved = turf.dissolve(featuresOutside);
      dissolved.features.map(obj => {
        obj.properties["fill"] = colorDensity
        obj.properties["fill-opacity"]= 0.6;
        obj.properties["stroke-opacity"]= 0;
        result.push(obj)
      })

      dissolved = turf.dissolve(featuresInside);
      dissolved.features.map(obj => {
        obj.properties["fill"] = colorDensity
        obj.properties["fill-opacity"]= 1;
        obj.properties["stroke-opacity"]= 0;
        result.push(obj)
      })
    }
    catch(err) {
      outArr.map(obj => {
        obj.properties["fill"] = colorDensity
        obj.properties["fill-opacity"]= 1;
        obj.properties["stroke-opacity"]= 0;
        result.push(obj)
      })

    }
    
    return result
  }

  function handleClusterByDensityList(valuesCluster, clustered){
    //densityRange
    let coordArr = new Array(densityRange.length)
    let coordArrInside = new Array(densityRange.length)
    let radius = getRadusPoint(reearth.camera.position.height)
    let options = {units: 'kilometers'};
    let options2 = {steps: 10, units: 'kilometers', };
    //SIngle point
    // Handle points not in any cluster
    clustered.features.forEach(obj => {
      if(!obj.properties.hasOwnProperty("cluster")){
        let pointGeo = turf.point(obj.geometry.coordinates)
        let circle = turf.circle(obj.geometry.coordinates, radius, options2);
        let circleInside = turf.transformScale(circle, 0.7);
        if(!coordArr[0]){
          coordArr[0] = []
          coordArrInside[0] = []
        }
        
        coordArr[0].push(circle.geometry.coordinates)
        coordArrInside[0].push(circleInside.geometry.coordinates)
      }
    })

    valuesCluster.forEach(clusterId => { 
      let clusterElms = turf.getCluster(clustered, {cluster: parseInt(clusterId)})
      let numberPoints = clusterElms.features.length
      let arrId = getIdColorDensity(numberPoints, densityRange)
      clusterElms.features.forEach(obj => {
        //Tao polygon cho moi diem
        let pointGeo = turf.point(obj.geometry.coordinates)

        let circle = turf.circle(obj.geometry.coordinates, radius, options2);
        let circleInside = turf.transformScale(circle, 0.8);

        if(!coordArr[arrId]) {
          coordArr[arrId] = []
          coordArrInside[arrId] = []
        }
        coordArr[arrId].push(circle.geometry.coordinates)
        coordArrInside[arrId].push(circleInside.geometry.coordinates)
      })
    })

    let result = [];
    coordArr.map((obj, id) => {
      let multiPoly = turf.multiPolygon(obj);
      multiPoly.properties["fill"] = densityRange[id].color
      multiPoly.properties["fill-opacity"]= 0.2;
      multiPoly.properties["stroke-opacity"]= 0;
      result.push(multiPoly)
    }) 

    coordArrInside.map((obj, id) => {
      let multiPoly = turf.multiPolygon(obj);
      multiPoly.properties["fill"] = densityRange[id].color
      multiPoly.properties["fill-opacity"]= 1;
      multiPoly.properties["stroke-opacity"]= 0;
      result.push(multiPoly)
    }) 
    //console.log(turf.featureCollection(result))
  }

  function createSingleHeatPoint(coord, cameraHeight) {
    let color = getColorDensity(1, densityRange)
    let radius = getRadusPoint(cameraHeight)
    let pointGeo = createColorPoint(radius, coord, color) 
    return pointGeo; 
  }

  function hanleSinglePointArr(pointArr) {
    let result =[];
    let radius = getRadusPoint(reearth.camera.position.height)
    let numberOfPoints = 1
    let colorDensity = getColorDensity(numberOfPoints, densityRange)
    let outArr = []
    let inArr = []
    let circleOptions = {steps: 8, units: 'kilometers'};

    pointArr.forEach(obj => {
      let circle = turf.circle(obj, radius, circleOptions);
      outArr.push(circle)
      let circleInside = turf.transformScale(circle, 0.7);
      inArr.push(circleInside)
    })
    let featuresOutside = turf.featureCollection(outArr)
    let featuresInside = turf.featureCollection(inArr)
    try {
      
      let dissolved = turf.dissolve(featuresOutside);
        dissolved.features.map(obj => {
        obj.properties["fill"] = colorDensity
        obj.properties["fill-opacity"]= 0.6;
        obj.properties["stroke-opacity"]= 0;
        result.push(obj)
      })
     
      dissolved = turf.dissolve(featuresInside);
      dissolved.features.map(obj => {
        obj.properties["fill"] = colorDensity
        obj.properties["fill-opacity"]= 1;
        obj.properties["stroke-opacity"]= 0;
        result.push(obj)
      })
    } catch(err) {
      //console.log("dissolved error")
      outArr.map(obj => {
        obj.properties["fill"] = colorDensity
        obj.properties["fill-opacity"]= 1;
        obj.properties["stroke-opacity"]= 0;
        result.push(obj)
      })
    }
    return result
  }

  function getRadusPoint(cameraHeight){
    let radius = 1000; //km
    if (cameraHeight <= 10000) {
      radius = Math.floor(cameraHeight/200)
    } else 
    if (cameraHeight <= 100000) {
      radius = Math.floor(cameraHeight/300)
    } else
    if (cameraHeight <= 300000) {
      radius = Math.floor(cameraHeight/500)
    }
    
    if (radius == 0) {
      radius = 1
    }
    radius = radius/1000
    if (radius > 0.01) {
      radius =radius.toFixed(2)
    }  
    
    return radius;
  }

  // get marker by selected tag
  function getMarkerByTag(layers, nameTag) {
    let temp = [];
    layers?.map((layer) => {
      if (layer.tags != undefined) {
        layer.tags.map(tagElm => {
          if (tagElm.tags == undefined ) {
            if (tagElm.label == nameTag) {
              temp.push(layer);
            }
          } else {
            if (tagElm.tags.length > 0) {
              if (tagElm.tags.some(obj => obj.label == nameTag)) {
                temp.push(layer);
              }
            }
          }
        });
      }
    });
    return temp;
  }

  function getAllLayers() {
    let allLayers = [];
    
    // Get all layers from folders
    let folders = reearth.layers.layers.filter((fo) => fo.type == "" && fo.isVisible == true);

    // Combine all markers and 3d models
    folders?.map((fd, index) => {
      getElementsOfFolder(fd, allLayers);
    });

    // Get datasets with type is 'marker' 
    let markerDataSets = reearth.layers.layers.filter(
      (layer) => layer.isVisible == true
      && typeLayer.includes(obj.type)
      && (typeof layer.children !== 'undefined')
      );

    // Get all makers level 1
    let layers = reearth.layers.layers.filter((o) => ((o.type == "marker" && o.children == undefined) || o.type == "model") && o.isVisible == true);
    allLayers = layers.concat(allLayers);

    return allLayers;
  }


  function getAllLayersByTag(tagName) {
    let allLayers = [];
    
    // Get all layers from folders
    let folders = reearth.layers.layers.filter(
          (fo) => fo.type == "" && fo.isVisible == true);

    // Check folders
    folders?.map((fd) => {
      if(isLayerHasTag(fd, tagName)) {
        getElementsOfFolder(fd,allLayers);
      } else {
        getElementsOfFolderByTag(fd, allLayers, tagName)
      }
    });

    let layers = reearth.layers.layers.filter(
      (layer) => layer.isVisible == true
      && typeLayer.includes(layer.type)
      && isLayerHasTag(layer, tagName)
      );
    allLayers = layers.concat(allLayers);
    
    return allLayers;
  }

  let typeLayer = ["marker", "model", "photooverlay", "ellipsoid"];

  // Get all marker layers and 3d model layers of folder
  function getElementsOfFolder(folderParent, result){
    folderParent.children?.map((obj, index) => {
        if (obj.type == "" && obj.isVisible == true) {
          getElementsOfFolder(obj,result);
        } else if (typeLayer.includes(obj.type) && obj.isVisible == true) {
          result.push(obj); 
        }
      });
      return result;
  }

  function getElementsOfFolderByTag(folderParent, result, tagName){
    folderParent.children?.map((obj, index) => {
        if (obj.type == "" && obj.isVisible == true) {
          if(isLayerHasTag(obj, tagName)) {
            getElementsOfFolder(obj,result);
          } else {
            getElementsOfFolderByTag(obj, result, tagName)
          }
        } else if (typeLayer.includes(obj.type) 
          && obj.isVisible == true
          && isLayerHasTag(obj, tagName)) {
          result.push(obj); 
        }
      });
      return result;
  }

  function isLayerHasTag(layer, tagName) {
    let hasTag = false
    layer?.tags?.map(elm => {
      if(elm.label == tagName ) {
        hasTag = true
      } else {
        if (elm.tags?.length > 0) {
          if (elm.tags.some(obj => obj.label == tagName)) {
            hasTag = true
          }
        }
      }
    })
    return hasTag
  }


  function handleDensityRange(densityList) {
    let densityRange = [];
    densityList.forEach(density => {
      if(density.minNumber) {
        densityRange.push(density)
      }
    })

    //Sort density range by number of points in ascending order
    densityRange = densityRange.sort(function(a, b) {
      return parseFloat(a.minNumber) - parseFloat(b.minNumber);
    });
    return densityRange
  }

  function getColorDensity(numberOfPoints, densityRange) {
    let color = densityRange[0].color;
    if (numberOfPoints < densityRange[0].minNumber) {
      color = densityRange[0].color 
    } else {
      for(let i=0; i<densityRange.length; i++) {
        if(numberOfPoints < densityRange[i].minNumber) {
          color = densityRange[i-1].color 
          break;
        } else {
          color = densityRange[i].color 
        }
      }
    }
    return color
  }

  function getIdColorDensity(numberOfPoints, densityRange) {
    let id = 0;
    if (numberOfPoints < densityRange[0].minNumber) {
      id = 0
    } else {
      for(let i=0; i<densityRange.length; i++) {
        if(numberOfPoints < densityRange[i].minNumber) {
          id = i-1
          break;
        } else {
          id = i
        }
      }
    }
    return id
  }

  // Get different between two json object
  function getObjectDiff(obj1, obj2) {
    let diff = {};
    if(obj1 && obj2) {
      // Check for keys in obj1 that are not in obj2
      for (let key in obj1) {
        if (!obj2.hasOwnProperty(key)) {
          diff[key] = [obj1[key], undefined];
        }
      }
      // Check for keys in obj2 that are not in obj1
      for (let key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
          diff[key] = [undefined, obj2[key]];
        }
      }
      // Check for keys in both objects
      for (let key in obj1) {
        if (obj2.hasOwnProperty(key)) {
          if (typeof obj1[key] === 'object') {
            diff[key] = getObjectDiff(obj1[key], obj2[key]);
          } else if (obj1[key] !== obj2[key]) {
            diff[key] = [obj1[key], obj2[key]];
          }
        }
      }
    }
    return diff;
  }

  function closePlugin() {
    document.getElementById("hanrei-section").style.display= "none"
    document.getElementById("plugin-icon").style.display= "block"
    parent.postMessage({ type: "resize", expanded: true, heightWp: 44, widthWp: 44 }, "*");
  }

  function openPlugin() {
    document.getElementById("plugin-icon").style.display= "none"
    document.getElementById("hanrei-section").style.display= "block"
    updateIframeSize() 
  }
</script>
`;
reearth.ui.show(html);


reearth.on('cameramove',(cameradata) => {
  reearth.ui.postMessage({ 
    type: "cameradata",
    payload: cameradata
  }, "*");
});

reearth.on("select", layerId => {
  reearth.ui.postMessage({
    type: "selectLayer"
  });
})

reearth.on("update", send);
send();

function send() {
  reearth.ui.postMessage({
    type: "updateWidget",
    property: reearth.widget.property,
  });
}

reearth.on("message", (msg) => {
  if (msg.type === "resize") {
    if(!msg.expanded) {
      reearth.ui.close()
    } else {
      reearth.ui.show(html, { width: msg.widthWp, height:  msg.heightWp })
    }
  }
});

const handles = {};

handles.initWidget = () => {
  reearth.ui.postMessage({
    type: "initWidget",
    property: reearth.widget.property,
  });
};

reearth.on("message", (msg) => {
  if (msg && msg.action) {
    handles[msg.action]?.(msg.payload);
  }
});
