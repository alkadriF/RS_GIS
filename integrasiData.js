// Menambah label judul platform
Map.add(ui.Label(
    'Indeks Kerentanan Penyakit Vektor 2016 Pulau Jawa', {fontWeight: 'bold', fontSize: '24px'})); 


var countries = Indonesia

var Nama_Provinsi = ['Banten','Jakarta Raya','Jawa Barat', 'Jawa Tengah', 'Yogyakarta', 'Jawa Timur' ] 
var geometry = countries.filter(ee.Filter.inList('NAME_1', Nama_Provinsi));
var area = ee.FeatureCollection(geometry);
//Map.addLayer(geometry,{color:"Blue" },"Provinsi");
Map.centerObject(area, 7);  

//------------------------------PARAMETER SUHU #1
var lst = temperature
.filterDate("2016-01-01","2016-12-30")
.select("LST_Day_1km")
.mean();

var lst_kelvin = lst.multiply(0.02); //kelvin
var lst_celsius = lst_kelvin.subtract(273); //celsius
var landSurfaceTemperatureVis = {
  min: 21,
  max: 36,
  palette: ["2af10b","f7ea15","d66107"],
};

//Map.addLayer(lst_celsius.clip(area), landSurfaceTemperatureVis, "Temperature")

var lstreclass = ee.Image(1) //RECLASS RENTANG SUHU
          .where(lst_celsius.gt(21).and(lst_celsius.lte(22)), 2)
          .where(lst_celsius.gt(24).and(lst_celsius.lte(26)), 3)
          .where(lst_celsius.gt(26).and(lst_celsius.lte(30)), 4)
          .where(lst_celsius.gt(30).and(lst_celsius.lte(34)), 5)
          .where(lst_celsius.gt(34).and(lst_celsius.lte(37)), 4)
          .where(lst_celsius.gt(37).and(lst_celsius.lte(38)), 3)
          .where(lst_celsius.gt(38).and(lst_celsius.lte(43)), 2)
          .where(lst_celsius.gt(43).and(lst_celsius.lte(50)), 1);
          
var intervals1 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#1008ff" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#04fddf" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#3aff00" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#f6ff04" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#ff3900" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';          
  
var lst_classified = lstreclass.sldStyle(intervals1).clip(area);
Map.addLayer(lstreclass.sldStyle(intervals1).clip(area), {}, 'Suhu Optimum');

//--------Legenda Suhu Optimum #1

var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
 
var legendTitle = ui.Label({
  value: 'Suhu Optimum',
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
 
var palette =['ff3900','f6ff04','3aff00','04fddf','1008ff'];
 
var names = ['Sangat Tinggi','Tinggi','Sedang','Rendah','Sangat Rendah'];
 
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
  

//PARAMETER KETINGGIAN #2
var elev = gmted.select("AVE_DSM");

var eleVis = {
  min: -100.0,
  max: 6000.0,
  palette: ["898776","fff9f1"]
};
//Map.addLayer(elev.clip(area), eleVis, 'Elevation');

var elevreclass = ee.Image(5)
          .where(elev.gt(30).and(elev.lte(120)), 4)
          .where(elev.gt(120).and(elev.lte(450)), 3)
          .where(elev.gt(450).and(elev.lte(700)), 2)
          .where(elev.gt(700).and(elev.lte(6000)), 1);
          
var intervals2 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#0e33a5" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#1aa184" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#30ab1d" quantity="3" label="3" />' + // Sedang 
      '<ColorMapEntry color="#b6752d" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#bc0202" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';

var elev_classified = elevreclass.sldStyle(intervals2).clip(area)
Map.addLayer(elevreclass.sldStyle(intervals2).clip(area), {}, 'Ketinggian Optimum');


//Legenda ketinggian Optimum #1
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }});
 
var legendTitle = ui.Label({
  value: 'Ketinggian Optimum',
  style: {fontWeight: 'bold',
    fontSize: '14px',
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
 
var palette =['bc0202','b6752d','30ab1d','1aa184','0e33a5']; 
var names = ['Sangat Tinggi','Tinggi','Sedang','Rendah','Sangat Rendah'];
 
 
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
  
//PARAMETER KELEMBABAN #3

var hum = humidity
.filterDate("2016-01-01","2016-12-31")
.select("Qair_f_inst")
.mean(); 


var hum_rescale = hum.multiply(5000); 

var humVis = {
  min: 69,
  max: 93,
  palette: ["fffc00","0ec406","3b08ff"],
};

//Map.addLayer(hum_rescale.clip(area), humVis, "Kelembaban");

var humreclass = ee.Image(1)
          .where(hum_rescale.gt(53.6).and(hum_rescale.lte(57.2)), 2)
          .where(hum_rescale.gt(57.2).and(hum_rescale.lte(60.8)), 3)
          .where(hum_rescale.gt(60.8).and(hum_rescale.lte(64.4)), 4)
          .where(hum_rescale.gt(64.4).and(hum_rescale.lte(82)), 5)
          .where(hum_rescale.gt(82).and(hum_rescale.lte(84)), 4)
          .where(hum_rescale.gt(84).and(hum_rescale.lte(86)), 3)
          .where(hum_rescale.gt(86).and(hum_rescale.lte(88)), 2)
          .where(hum_rescale.gt(88).and(hum_rescale.lte(100)), 1);
          
var intervals3 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ff3900" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#ffd900" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#00ff01" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#08fff8" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#1008ff" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';
  
var hum_classified = humreclass.sldStyle(intervals3).clip(area);
Map.addLayer(humreclass.sldStyle(intervals3).clip(area), {}, 'Kelembapan Optimum');

//Legenda KELEMBABAN #3
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }});
 
var legendTitle = ui.Label({
  value: 'Kelembaban Optimum',
  style: {fontWeight: 'bold',
    fontSize: '14px',
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
 
var palette =['1008ff','08fff8','00ff01','ffd900','ff3900']; 
var names = ['Sangat Tinggi','Tinggi','Sedang','Rendah','Sangat Rendah'];
 
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }

//PARAMETER Vegetasi
  
var landsat8 = l8
.filterDate("2016-01-01","2016-12-31")
.sort('CLOUD_COVER', false)
.mean(); 

// Compute the Normalized Difference Vegetation Index (NDVI).
var nir = landsat8.select('B5');
var red = landsat8.select('B4');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI_2018');
var ndviParams = {min: -1, max: 1, palette: ['red', 'yellow', 'green']};
//Map.addLayer(ndvi.clip(area), ndviParams, 'NDVI image');

var ndvireclass = ee.Image(5) //RECLASS RENTANG NDVI
          .where(ndvi.gt(0.2).and(ndvi.lte(0.3)), 4)
          .where(ndvi.gt(0.3).and(ndvi.lte(0.4)), 3)
          .where(ndvi.gt(0.4).and(ndvi.lte(0.6)), 2)
          .where(ndvi.gt(0.6).and(ndvi.lte(1)), 1);

          
var intervals5 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#1be907" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#76e704" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#dccf00" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#d06d00" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#d63000" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';
var nclass = ndvireclass.sldStyle(intervals5).clip(area)
Map.addLayer(ndvireclass.sldStyle(intervals5).clip(area), {}, 'Vegetasi Optimum');

//Legenda Vegetasi
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }});
 
var legendTitle = ui.Label({
  value: 'Vegetasi Optimum',
  style: {fontWeight: 'bold',
    fontSize: '14px',
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
 
var palette =['d63000','d06d00','dccf00','76e704','1be907']; 
var names = ['Sangat Tinggi','Tinggi','Sedang','Rendah','Sangat Rendah'];
 
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
  
//Gabungan semua Parameter
//KATEGORISASI
var all = lstreclass.add(elevreclass).add(humreclass).add(ndvireclass); //reclassify

var allreclass = ee.Image(1)
          .where(all.gt(10).and(all.lte(13)), 2)
          .where(all.gt(13).and(all.lte(15)), 3)
          .where(all.gt(15).and(all.lte(18)), 4)
          .where(all.gt(17).and(all.lte(20)), 5);

var intervals4 = 
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#022ad0" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#00ffec" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#69fd02" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#f6ff00" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#ff1903" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';

var all_classified = allreclass.sldStyle(intervals4).clip(area)
Map.addLayer(allreclass.sldStyle(intervals4).clip(area), {}, 'Kerentanan Penyakit Vektor');

//Legenda Klasifikasi akhir
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
 
var legendTitle = ui.Label({
  value: 'Tingkat Kerentanan Penyakit Vektor',
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
 
var palette =['ff1903','f6ff00','69fd02','00ffec','022ad0'];
 
var names = ['Sangat Tinggi','Tinggi','Sedang','Rendah','Sangat Rendah'];
 
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
