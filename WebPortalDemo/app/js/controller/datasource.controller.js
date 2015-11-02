/**
 * Created by JIANGWI on 5/20/2015.
 */
var contrl = angular.module('webPortalApp.dataSourceController', [
    'ngRoute',
    'ngCookies',
    'ngFileUpload'
]);

contrl.controller('dataSourceMng', function (Upload, $cookieStore, $scope, $http, $route, $location, commonService) {
    //First, load ds manage page, load all apps and all datasources and ds count
    commonService.getApps($scope);
    $http.get('/getAllDS').success(function (response) {
        $scope.datasources = response;
    });

    $http.get('/getDataSourceCount').success(function (response) {
        $scope.dsCount = response.count;
        length=$scope.dsCount/5;
        if($scope.dsCount%5!==0){
            length++;
        }
        nums=[];
        for(var i=1;i<length;i++){
            nums.push(i);
        }
        $scope.nums=nums;
    });




    //Then select app event, filter ds with app ,also load types by this app
    $scope.selectApp = function () {
        $scope.appFil = $scope.app.name;
        $scope.types = $scope.app.types;
    };

    //Then select type event , filter ds with type
    $scope.selectType = function () {
        $scope.typeFil = $scope.type;
    };

    //clear choose con or input search con
    $scope.clearChoose = function () {
        $route.reload();
    };

    //Then select order by event
    $scope.selectOrder = function () {
        $scope.order = $scope.orderCon;
    };

    /** modal dialog setting */

        //adapter combo

    $scope.isExcel = true;
    $scope.selectAdapterType = function () {
        if ($scope.datasource.adapter.adapter_type == 'Excel') {
            $scope.isExcel = false;
        } else {
            $scope.isExcel = true;
            $scope.datasource.adapter.with_col_header = false;
            $scope.datasource.adapter.is_multi_sheets = false;
        }
    };

    //channel combo
    $scope.chooseChannel = false;
    var channelTypeArray = ['FTPInbound', 'FTPOutbound', 'EmailInbound', 'EmailOutbound'];
    $scope.FTPInbound = false;
    $scope.FTPOutbound = false;
    $scope.EmailInbound = false;
    $scope.EmailOutbound = false;
    $scope.selectChannelType = function () {
        $scope.chooseChannel = true;
        if ($scope.channelType == 'FTPInbound') {
            $scope.FTPInbound = true;
            $scope.FTPOutbound = false;
            $scope.EmailInbound = false;
            $scope.EmailOutbound = false;

        }
        if ($scope.channelType == 'FTPOutbound') {
            $scope.FTPInbound = false;
            $scope.FTPOutbound = true;
            $scope.EmailInbound = false;
            $scope.EmailOutbound = false;
        }
        if ($scope.channelType == 'EmailInbound') {
            $scope.FTPInbound = false;
            $scope.FTPOutbound = false;
            $scope.EmailInbound = true;
            $scope.EmailOutbound = false;
        }
        if ($scope.channelType == 'EmailOutbound') {
            $scope.FTPInbound = false;
            $scope.FTPOutbound = false;
            $scope.EmailInbound = false;
            $scope.EmailOutbound = true;
        }
    };

    //transformer combo
    $scope.progress = false;
    $scope.isSplit = true;
    $scope.inputHint = 'check';
    $scope.needSplit = function (val) {
        if (val) {
            $scope.isSplit = false;
        } else {
            $scope.isSplit = true;
            $scope.datasource.transformer.split_num = null;
            $scope.datasource.transformer.node_path = null;
            $scope.inputHint = 'check';
        }
    };
    //check split number input is num
    $scope.validateNum = function () {
        if (!isNaN($scope.datasource.transformer.split_num)) {
            $scope.inputHint = 'check';
        } else {
            $scope.inputHint = 'close';
        }
    };

    //close button to clear data
    $scope.clearData = function () {
        $scope.datasource = null;
    };

    //remove ds button
    $scope.sendDS = function (ds) {
        var removeDS = ds;
        $scope.removeDS = function () {
            $http.post('/removeDS', removeDS).success(function (response) {
                if (response) {
                    $scope.datasources.splice($scope.datasources.indexOf(ds), 1);
                    $scope.dsCount--;
                }
            });
        };
    };

    //upload xslt

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/uploadFile',
                    fields: {'username': $scope.userName},
                    file: file
                }).progress(function (evt) {
                    $scope.progress = true;
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.percentage = progressPercentage;
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    $scope.progress = false;
                    $scope.datasource.transformer.xslt_name = data.xsltName;
                    $scope.datasource.transformer.xslt = data.content.data;
                });
            }
        }
    };

    //download xslt
    $scope.downloadXSLT = function () {
        var id = $scope.datasource._id;
        window.location = '/downloadFile?id=' + id;
    }

    //add no consistence attribute into data source
    $scope.datasource = {
        app_name: '',
        type: '',
        channelType: ''

    };

    //add or edit button to show modal dialog and default value setting for combo
    $scope.dsOp = function (val) {
        if (val) {
            //detail ds info
            $scope.datasource = val;
            $scope.isCreate = false;
            $scope.appName = $scope.datasource.app_name;
            $scope.typeName = $scope.datasource.type;
            $scope.chooseChannel = true;
            if ($scope.datasource.adapter.adapter_type == 'Excel') {
                $scope.isExcel = false;
            }
            $scope.channelType = null;
            $scope.FTPInbound = false;
            $scope.FTPOutbound = false;
            $scope.EmailInbound = false;
            $scope.EmailOutbound = false;
            if (val.channel.channel_type == "FTPInbound") {
                $scope.channelType = 'FTPInbound';
                $scope.FTPInbound = true;
                $scope.datasource.ftpInboundChannel = val.channel;
            }
            if (val.channel.channel_type == "FTPOutbound") {
                $scope.channelType = 'FTPOutbound';
                $scope.FTPOutbound = true;
                $scope.datasource.ftpOutboundChannel = val.channel;
            }
            if (val.channel.channel_type == "EmailInbound") {
                $scope.channelType = 'EmailInbound';
                $scope.EmailInbound = true;
                $scope.datasource.emailInboundChannel = val.channel;
            }
            if (val.channel.channel_type == "EmailOutbound") {
                $scope.channelType = 'EmailOutbound';
                $scope.EmailOutbound = true;
                $scope.datasource.emailOutboundChannel = val.channel;
            }
            if ($scope.datasource.transformer.need_split) {
                $scope.isSplit = false;
            }
        } else {
            //new ds
            $scope.datasource = null;
            $scope.isCreate = true;
            $scope.channelType = null;
            $scope.chooseChannel = false;
        }
    };

    //confirm button to create or update data source
    $scope.confirmDS = function () {
        if ($scope.datasource) {
            if ($scope.datasource._id) {
                //update ds operation
                $scope.datasource.channelType = $scope.channelType;
                $http.post('/updateDS', $scope.datasource).success(function (data) {
                    if (data) {
                        console.log('data:' + data);
                        $('#myModal').modal('hide');
                    }
                });
                //setTimeout($route.reload(), 2000 );

            } else {
                //create ds operation
                $scope.datasource.app_name = $scope.app.name;
                $scope.datasource.type = $scope.type;
                $scope.datasource.channelType = $scope.channelType;
                $http.post('/createDS', $scope.datasource).success(function (data) {
                    if (data) {
                        console.log('data:' + data);
                        $scope.dsCount++;
                        $scope.datasources.splice($scope.datasources.length, 0, data);
                    }
                });
                // $route.reload();
            }

        }
    };


});