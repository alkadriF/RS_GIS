var countries = table

var Nama_Provinsi = ['Lampung', 'Banten']
var Geometry = countries.filter(ee.Filter.inList('NAME_1', Nama_Provinsi));
var Area = Geometry;
Map.addLayer(Geometry,{color:"Blue" },"Provinsi");
Map.centerObject(Area,8);

var krakatau = Krakatoa
Map.addLayer(krakatau,{color:"Green" },"Gunung Krakatau");

var SO2April2020 = SO2
.filterDate('2020-04-08', '2020-04-15')
.select('SO2_column_number_density')
.filterBounds(Area)
.sort('CLOUD_COVER', false);

var SO2Desember2018 = SO2
.filterDate('2018-12-20', '2018-12-27')
.select('SO2_column_number_density')
.filterBounds(Area)
.sort('CLOUD_COVER', false);
    
var band_viz = {
  min: 0.0,
  max: 0.0005,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(SO2April2020.mean().clip(Area), band_viz, 'SO2_April2020');
Map.addLayer(SO2Desember2018.mean().clip(Area), band_viz, 'SO2_Desember2018');

var SO2April2020_Krakatau = SO2
.filterDate('2020-04-08', '2020-04-15')
.select('SO2_column_number_density')
.filterBounds(krakatau)
.sort('CLOUD_COVER', false);

var SO2_TimeSeries = ui.Chart.image.seriesByRegion(SO2April2020_Krakatau, krakatau , ee.Reducer.mean(),'SO2_column_number_density',
30, 'system:time_start', 'label')
.setOptions({
title: 'Average Distribution of SO2 in Mount Krakatau on April 2020 Eruption',
vAxis: {title: 'Amount of SO2 (mol/m^2)*'},
hAxis: {title: 'Time', format: 'dd-MM-yyyy', gridlines: {count: 7}},
series: {
      0: {
        color: 'blue',
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 2,
      },
    },
})
ui.root.widgets().add(SO2_TimeSeries);

var SO2Desember2018_Krakatau = SO2
.filterDate('2018-12-13', '2018-12-30')
.select('SO2_column_number_density')
.filterBounds(krakatau)
.sort('CLOUD_COVER', false);

var SO2_TimeSeries2 = ui.Chart.image.seriesByRegion(SO2Desember2018_Krakatau, krakatau , ee.Reducer.mean(),'SO2_column_number_density',
30, 'system:time_start', 'label')
.setOptions({
title: 'Average Distribution of SO2 in Mount Krakatau on Desember 2018 Eruption',
vAxis: {title: 'Amount of SO2 (mol/m^2)*'},
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
ui.root.widgets().add(SO2_TimeSeries2);

//Aerosol
var AerApril2020 = Aerosol
.filterDate('2020-04-08', '2020-04-15')
.select('absorbing_aerosol_index')
.filterBounds(Area)
.sort('CLOUD_COVER', false);

var AerDesember2018 = Aerosol
.filterDate('2018-12-20', '2018-12-27')
.select('absorbing_aerosol_index')
.filterBounds(Area)
.sort('CLOUD_COVER', false);
    
var band_viz_Aer = {
  min: -2.473955089785871,
  max: -0.8577151794552171,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(AerApril2020.mean().clip(Area), band_viz_Aer, 'Aer_April2020');
Map.addLayer(AerDesember2018.mean().clip(Area), band_viz_Aer, 'Aer_Desember2018');

var AerApril2020_Krakatau = Aerosol
.filterDate('2020-04-08', '2020-04-15')
.select('absorbing_aerosol_index')
.filterBounds(krakatau)
.sort('CLOUD_COVER', false);

var Aer_TimeSeries = ui.Chart.image.seriesByRegion(AerApril2020_Krakatau, krakatau , ee.Reducer.mean(),'absorbing_aerosol_index',
30, 'system:time_start', 'label')
.setOptions({
title: 'Average Distribution of Aerosol in Mount Krakatau on April 2020 Eruption',
vAxis: {title: 'Absorbing Aerosol Index'},
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
ui.root.widgets().add(Aer_TimeSeries);

var AerDesember2018_Krakatau = Aerosol
.filterDate('2018-12-13', '2018-12-30')
.select('absorbing_aerosol_index')
.filterBounds(krakatau)
.sort('CLOUD_COVER', false);

var Aer_TimeSeries2 = ui.Chart.image.seriesByRegion(AerDesember2018_Krakatau, krakatau , ee.Reducer.mean(),'absorbing_aerosol_index',
30, 'system:time_start', 'label')
.setOptions({
title: 'Average Distribution of Aerosol in Mount Krakatau on Desember 2018 Eruption',
vAxis: {title: 'Absorbing Aerosol Index'},
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
ui.root.widgets().add(Aer_TimeSeries2);

var Population = GPWv411
.select('population_count');

var raster_vis = {
  "max": 1000.0,
  "palette": [
    "ffffe7",
    "86a192",
    "509791",
    "307296",
    "2c4484",
    "000066"
  ],
  "min": 0.0
};

Map.addLayer(Population.mean().clip(Area), raster_vis, 'Population');
