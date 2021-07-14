var countries = table
/*
var Nama_Provinsi = ['Jawa Barat']
var Provinsi = countries.filter(ee.Filter.inList('NAME_1', Nama_Provinsi));
Map.addLayer(Provinsi,{color:"Blue" },"Provinsi");
*/
var Nama_kabKot = ['Kota Bandung']
var kabKot = countries.filter(ee.Filter.inList('NAME_2', Nama_kabKot));
Map.addLayer(kabKot,{color:"Green" },"kabKot");
Map.centerObject(kabKot, 12);

//.filter(ee.Filter.date('2018-01-01', '2018-05-01'))

var gasDist = NO2
.filterDate('2019-12-10', '2020-04-10')
.select('NO2_column_number_density');

var band_viz = {
  min: 0.00006030451023362963,
  max: 0.00007459177193624784,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(gasDist.mean().clip(kabKot), band_viz, 'S5P N02');

//Map.addLayer(gasDist.clip(kabKot), 'NO2');
//Map.addLayer(LST.clip(Provinsi), imageVisParam, 'Land Surface Temperature');

var NO2_TimeSeries = ui.Chart.image.seriesByRegion(gasDist, kabKot, ee.Reducer.mean(),'',
30, 'system:time_start', 'label')
.setOptions({
title: 'Average Distribution of NO2 in Bandung on January - April 2020',
vAxis: {title: 'Strecthed Amount of NO2 (mol/m^2)*'},
hAxis: {title: 'Time', format: 'dd-MM-yyyy', gridlines: {count: 7}},
series: {
      0: {
        color: 'blue',
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 2,
      },
    },
});
ui.root.widgets().add(NO2_TimeSeries);
