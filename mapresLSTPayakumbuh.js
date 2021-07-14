var countries = Indonesia

var Nama_Provinsi = ['Sumatera Barat']
var Provinsi = countries.filter(ee.Filter.inList('NAME_1', Nama_Provinsi));
Map.addLayer(Provinsi,{color:"Blue" },"Provinsi");

var Nama_kabKot = ['Payakumbuh']
var kabKot = countries.filter(ee.Filter.inList('NAME_2', Nama_kabKot));
Map.addLayer(kabKot,{color:"Green" },"kabKot");

Map.centerObject(Provinsi, 8);

var LST = MOD11A1
.filter(ee.Filter.date('2018-01-01', '2018-05-01'))
.select('LST_Day_1km')
.mean();

//var landSurfaceTemperatureVis = {
//  min: 13000.0,
//  max: 16500.0,
//  palette: [
//    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
//    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
//    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
//    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
//    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
//  ],
  
//}

Map.addLayer(LST.clip(Provinsi), imageVisParam, 'Land Surface Temperature');

var countries = Indonesia

var Nama_KotaKabupaten = ['Payakumbuh']
var KotaKabupaten = countries
.filter(ee.Filter.inList('NAME_2', Nama_KotaKabupaten));

Map.addLayer(KotaKabupaten,{color:"Yellow" },"KotaKabupaten");
Map.centerObject(KotaKabupaten, 12);  

var Landsat8 = L8
.filterDate('2018-01-01', '2018-12-31')
.select('B11')
.sum();

var imageVisParam = { 
  min: 5045,
  max: 5130,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ]
};

Map.addLayer(Landsat8.clip(KotaKabupaten), imageVisParam, 'Land Surface Temperature');

var Landsat8 = L8
.filterDate('2016-01-01', '2018-12-31')
.select('B11');

// Define a FeatureCollection
// var Location = ee.FeatureCollection([
//  ee.Feature(ee.Geometry.Point(100.620,0.232)),
//  ee.Feature(ee.Geometry.Point(100.639,0.219)),
//  ee.Feature(ee.Geometry.Point(100.640,0.236)),
//  ]);

var Landsat8_Thermal = L8
.filterDate('2016-01-01', '2018-12-31')
.select('B11');

// Create a time series chart.
var Landsat8_ThermalTimeSeries = ui.Chart.image.seriesByRegion(Landsat8_Thermal, KotaKabupaten, ee.Reducer.mean(),'',
30, 'system:time_start', 'label')
.setOptions({
title: 'Suhu Permukaan Rata-Rata Kota Payakumbuh',
vAxis: {title: 'Suhu Permukaan (Kelvin)'},
hAxis: {title: 'Waktu', format: 'MM-yy', gridlines: {count: 7}},
series: {
      0: {
        color: 'magenta',
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 2,
      },
    },
});
ui.root.widgets().add(Landsat8_ThermalTimeSeries);
