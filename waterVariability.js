//Judul
Map.add(ui.Label(
    'Deteksi Dampak Variabilitas Curah Hujan dan Kelembaban Tanah Terhadap Hasil Produksi Padi di Sumatera Barat', {fontWeight: 'bold', fontSize: '24px'})); 

//Mendefinisikan cakupan area
var countries = indo

var Nama_Provinsi = ['Sumatera Barat']
var prov = countries.filter(ee.Filter.inList('NAME_1', Nama_Provinsi));
Map.addLayer(prov,{color:"White"}, "Sumatera Barat");
Map.centerObject(prov, 7);

//Mendefinisikan ImageCollection yang digunakan
var Prec2015 = prec.filter(ee.Filter.date('2015-04-01', '2015-12-31'))
                  .mean()
                  .select('precipitation');
var Prec2016 = prec.filter(ee.Filter.date('2016-01-01', '2016-12-31'))
                  .mean()
                  .select('precipitation');
var Prec2017 = prec.filter(ee.Filter.date('2017-01-01', '2017-12-31'))
                  .mean()
                  .select('precipitation');
var Prec2018 = prec.filter(ee.Filter.date('2018-01-01', '2018-12-31'))
                  .mean()
                  .select('precipitation');
var Prec2019 = prec.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
                  .mean()
                  .select('precipitation');
var Precall = prec.filter(ee.Filter.date('2015-04-01', '2019-12-31'))
                  .mean()
                  .select('precipitation');

//Klasifikasi
//Ubah tahun pendefinisian 2015 - 2019
//Hal ini dilakukan untuk menghindari user memory limit exceeded
var precclass2015 = ee.Image(2) //RECLASS RENTANG SUHU
          .where((Prec2015.lte(0.2)), 1)
          .where(Prec2015.gt(0.2).and(Prec2015.lte(0.4)), 2)
          .where(Prec2015.gt(0.4).and(Prec2015.lte(0.6)), 3)
          .where((Prec2015.gt(0.6)), 4);

var intervals2 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#daedf7" quantity="1" label="1" />' + // Rendah
      '<ColorMapEntry color="#99d7f7" quantity="2" label="2" />' + // Sedang
      '<ColorMapEntry color="#52c1fa" quantity="3" label="3" />' + // Tinggi
      '<ColorMapEntry color="#0479b5" quantity="4" label="4" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>'; 

//Menempelkan citra sebagai layer
//Ubah tahun pendefinisian 2015 - 2019
//Hal ini dilakukan untuk menghindari user memory limit exceeded
var prec_classified2015 = precclass2015.sldStyle(intervals2).clip(prov);
Map.addLayer(prec_classified2015, {}, 'Raw-Monthly Precipitation along 2015');

//Pembuatan legenda pada peta
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
 
var legendTitle = ui.Label({
  value: 'Presipitasi (mm)',
  style: {fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
 
legend.add(legendTitle);
Map.add(legend);

var makeRow = function(color, name) {
 
        var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }});
 
            var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
 
        return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
 
var palette =['daedf7', '99d7f7', '52c1fa'];
var names = ['0.2-0.4','0.4-0.6','>0.6'];
 
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }

//Mendefinisikan ImageCollection yang digunakan
var sw2015 = moist
.filter(ee.Filter.date('2015-04-01', '2015-12-31'))
.mean()
.select('ssm');
var sw2016 = moist.filter(ee.Filter.date('2016-01-01', '2016-12-31'))
.mean()
.select('ssm');
var sw2017 = moist.filter(ee.Filter.date('2017-01-01', '2017-12-31'))
.mean()
.select('ssm');
var sw2018 = moist.filter(ee.Filter.date('2018-01-01', '2018-12-31'))
.mean()
.select('ssm');
var sw2019 = moist.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.mean()
.select('ssm');
var swall = moist.filter(ee.Filter.date('2015-04-01', '2019-12-31'))
.mean()
.select('ssm');

//Klasifikasi
var intervals1 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#cc9200" quantity="1" label="1" />' + // Rendah
      '<ColorMapEntry color="#81cc00" quantity="2" label="2" />' + // Sedang
      '<ColorMapEntry color="#006e0b" quantity="3" label="3" />' + // Tinggi
      '<ColorMapEntry color="#3151a3" quantity="4" label="4" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>'; 

//Ubah tahun pendefinisian 2015 - 2019
//Hal ini dilakukan untuk menghindari user memory limit exceeded
var moistclass2015 = ee.Image(1) //RECLASS RENTANG SUHU
          .where((sw2015.lte(5)), 1)
          .where(sw2015.gt(5).and(sw2015.lte(15)), 2)
          .where(sw2015.gt(15).and(sw2015.lte(20)), 3)
          .where((sw2015.gt(20)), 4);

//Ubah tahun pendefinisian 2015 - 2019
//Hal ini dilakukan untuk menghindari user memory limit exceeded
var moist_classified2015 = moistclass2015.sldStyle(intervals1).clip(prov);
Map.addLayer(moist_classified2015, {}, 'Raw-Soil moisture along 2016');

//Pembuatan legenda
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
 
var legendTitle = ui.Label({
  value: 'Kelembaban Tanah (mm)',
  style: {fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
 
legend.add(legendTitle);

Map.add(legend);

var makeRow = function(color, name) {
 
        var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }});
 
            var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
 
        return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
 
var palette =['cc9200', '81cc00', '006e0b', '3151a3'];
var names = ['0-5','5-15','15-20','20-25'];
 
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }

//Memunculkan chart dari data raw sepanjang tahun (2015/2016/2017/2018/2019)

// var TS = ui.Chart.image.seriesByRegion(Prec2015, prov , ee.Reducer.mean(),
// 'precipitation',
// 500, 'system:time_start', 'label')
// .setOptions({
// title: 'Monthly Precipitation along 2015',
// vAxis: {title: 'Precipitation (mm)'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// });
// print(TS);

// var TS = ui.Chart.image.seriesByRegion(Prec2016, prov , ee.Reducer.mean(),
// 'precipitation',
// 500, 'system:time_start', 'label')
// .setOptions({
// title: 'Monthly Precipitation along 2016',
// vAxis: {title: 'Precipitation (mm)'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// });
// print(TS);

// var TS = ui.Chart.image.seriesByRegion(Prec2017, prov , ee.Reducer.mean(),
// 'precipitation',
// 500, 'system:time_start', 'label')
// .setOptions({
// title: 'Monthly Precipitation along 2017',
// vAxis: {title: 'Precipitation (mm)'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// });
// print(TS);

// var TS = ui.Chart.image.seriesByRegion(Prec2018, prov , ee.Reducer.mean(),
// 'precipitation',
// 500, 'system:time_start', 'label')
// .setOptions({
// title: 'Monthly Precipitation along 2018',
// vAxis: {title: 'Precipitation (mm)'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// });
// print(TS);

// var TS = ui.Chart.image.seriesByRegion(Prec2019, prov , ee.Reducer.mean(),
// 'precipitation',
// 500, 'system:time_start', 'label')
// .setOptions({
// title: 'Monthly Precipitation along 2019',
// vAxis: {title: 'Precipitation (mm)'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// });
// print(TS);

// print(ui.Chart.image.series(sw2015, prov, ee.Reducer.mean(), 5000)
// .setOptions({
// title: 'Average Soil moisture along 2015',
// vAxis: {title: 'Soil Moisture (mm)'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// }));

// print(ui.Chart.image.series(sw2016, prov, ee.Reducer.mean(), 5000)
// .setOptions({
// title: 'Average Soil moisture along 2016',
// vAxis: {title: 'Soil Moisture (mm)'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// }));

// print(ui.Chart.image.series(sw2017, prov, ee.Reducer.mean(), 5000)
// .setOptions({
// title: 'Average Soil moisture along 2017',
// vAxis: {title: 'Soil Moisture (mm)'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// }));

// print(ui.Chart.image.series(sw2018, prov, ee.Reducer.mean(), 5000)
// .setOptions({
// title: 'Average Soil moisture along 2018',
// vAxis: {title: 'Soil Moisture (mm)'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// }));

// print(ui.Chart.image.series(sw2019, prov, ee.Reducer.mean(), 5000)
// .setOptions({
// title: 'Average Soil moisture along 2019',
// vAxis: {title: 'Soil Moisture (mm)'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// }));

//Pendefinisian variabel imageCollection sepanjang tempo waktu pengamatan
//Tidak dieksekusi karena banyaknya data yang harus diolah dan ditampilkan oleh earth engine

// var annualprec = prec.filter(ee.Filter.date('2015-04-01', '2019-12-31'))
//                   .mean()
//                   .select('precipitation');
                  
// var annumprec = annualprec.sldStyle(intervals2).clip(prov);
// // Map.addLayer(annumprec, {}, 'Average Precipitation along 2015 - 2019');                  

// var annualssm = moist.filter(ee.Filter.date('2015-04-01', '2019-12-31'))
//                   .mean()
//                   .select('ssm');
// var annumssm = annualssm.sldStyle(intervals1).clip(prov);
// Map.addLayer(annumssm, {}, 'Average Soil moisture along 2015 - 2019');

// var APTS = ui.Chart.image.seriesByRegion(annualprec, prov , ee.Reducer.mean(),
// 'precipitation',
// 500, 'system:time_start', 'label')
// .setOptions({
// title: 'Average Precipitation along 2015 - 2019',
// vAxis: {title: 'Precipitation'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// });
// print(APTS);

// Interpolasi variabel prec

// Ambil area sampel variabel precall sebagai untuk membuat FeatureCollection.
var sampleprec = Precall.addBands(ee.Image.pixelLonLat())
  .sample({region: prov, numPixels: 1000,  scale:1000, projection: 'EPSG:4326'})
  .map(function(sample) {
    var lat = sample.get('latitude');
    var lon = sample.get('longitude');
    var precipitation = sample.get('precipitation');
    return ee.Feature(ee.Geometry.Point([lon, lat]), {precipitation: precipitation});
  });

// Interpolasi precall dari sampel
var interpolated = sampleprec.kriging({
  propertyName: 'precipitation',
  shape: 'gaussian',
  range: 10 * 10,
  sill: 1.0,
  nugget: 0.1,
  maxDistance: 10 * 1000,
  reducer: 'mean',
});

//klasifikasi
var precclass = ee.Image(2) //RECLASS RENTANG SUHU
          .where((interpolated.lte(0.2)), 1)
          .where(interpolated.gt(0.2).and(interpolated.lte(0.4)), 2)
          .where(interpolated.gt(0.4).and(interpolated.lte(0.8)), 3)
          .where((interpolated.gt(0.8)), 4);

var prec_classified2 = precclass.sldStyle(intervals2).clip(prov);
// Map.addLayer(prec_classified2, {}, 'Interpolated');

// Interpolasi ssm
// Ambil area sampel variabel swall untuk membuat FeatureCollection.
var samples = swall.addBands(ee.Image.pixelLonLat())
  .sample({region: prov, numPixels: 1000,  scale:1000, projection: 'EPSG:4326'})
  .map(function(sample) {
    var lat = sample.get('latitude');
    var lon = sample.get('longitude');
    var ssm = sample.get('ssm');
    return ee.Feature(ee.Geometry.Point([lon, lat]), {ssm: ssm});
  });

// Interpolasi ssm dari sampel
var interpolated2 = samples.kriging({
  propertyName: 'ssm',
  shape: 'exponential',
  range: 10 * 10,
  sill: 1.0,
  nugget: 0.05,
  maxDistance: 10 * 1000,
  reducer: 'mean',
});

//klasifikasi
var moistclass2 = ee.Image(1) //RECLASS RENTANG SUHU
          .where((interpolated2.lte(5)), 1)
          .where(interpolated2.gt(5).and(interpolated2.lte(15)), 2)
          .where(interpolated2.gt(15).and(interpolated2.lte(20)), 3)
          .where((interpolated2.gt(20)), 4);

var moist_classified2 = moistclass2.sldStyle(intervals1).clip(prov);
// Map.addLayer(moist_classified2, {}, 'Interpolated');

// // Eksport citra
// Export.image.toDrive({
//   image: moist_classified2,
//   description: 'ssm_all',
//   scale: 500,
//   region: prov
// });

// // Eksport citra
// Export.image.toDrive({
//   image: prec_classified2,
//   description: 'prec_all',
//   scale: 500,
//   region: prov
// });

// Export a cloud-optimized GeoTIFF.
Export.image.toDrive({
  image: prec_classified2,
  description: 'imageToCOGeoTiffExample',
  scale: 500,
  region: prov,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});



// Tidak dieksekusi karena banyaknya data yang harus diolah
// var ASTS = ui.Chart.image.seriesByRegion(annualss, prov , ee.Reducer.mean(),
// 'precipitation',
// 500, 'system:time_start', 'label')
// .setOptions({
// title: 'Average Soil Moisture along 2015 - 2019',
// vAxis: {title: 'Moisture'},
// hAxis: {title: 'Time'},
// pointSize: 3,
// });
// print(ASTS);

//Combine two image collections
// var mod1 = GRACE.select('lwe_thickness_csr')
// var mod2 = resampleSWS.select('resampled SWS')

// var filter = ee.Filter.equals({
//   leftField: 'system:time_start',
//   rightField: 'system:time_start'
// });

// // Create the join.
// var simpleJoin = ee.Join.inner();

// // Inner join
// var innerJoin = ee.ImageCollection(simpleJoin.apply(Prec2015, sw2015, filter))

// var joined = innerJoin.map(function(feature) {
//   return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
// })

// print('Joined', joined)

// print(ui.Chart.image.series({
//   imageCollection: joined.select(['Prec2015','sw2015']),
//   region: prov,
//   reducer: ee.Reducer.pearsonsCorrelation(),
//   scale: 30}))
