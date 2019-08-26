<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>

    <link rel="shortcut icon" href="favicon.ico">
    <link href="../hplus/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="../hplus/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">

    <!-- jqgrid-->
    <link href="../hplus/css/plugins/jqgrid/ui.jqgridffe4.css?0820" rel="stylesheet">

    <link href="../hplus/css/animate.min.css" rel="stylesheet">
    <link href="../hplus/css/style.min862f.css?v=4.1.0" rel="stylesheet">

    <style type="text/css">

        table {
            display: block;
            overflow-x: scroll;
        }

        .self-input {
            border: 1px solid #E5E5E5;
            outline: none;
            text-align: center;
            border-radius: 4px;
            font: normal 13px/100% Verdana, Tahoma, sans-serif;
            background: #FFFFFF;
            box-shadow: rgba(58, 95, 205, 0.2) 0 0 8px;
            -moz-box-shadow: rgba(58, 95, 205, 0.2) 0 0 8px;
            -webkit-box-shadow: rgba(58, 95, 205, 0.2) 0 0 8px;
        }

        input:hover {
            border-color: #00BFFF;
        }

    </style>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content">
    <div class="ydc-row">
        <div>Carrier Code</div>
        <input class="self-input" id='orderDate' type="date"/>

        <div>Start Date</div>
        <input class="self-input" type="text" list="arrival_12"/>

        <dataList id="arrival_12">
            <select>
                <option>F</option>
                <option>I</option>
            </select>
        </dataList>

        <input class="self-input" type="text" list="arrival_1"/>
        <dataList id="arrival_1">
            <select>
                <option>AC</option>
                <option>DI</option>
            </select>
        </dataList>

    </div>

    <div class="ydc-row">
        <div>Routing</div>
        <input class="self-input" type="text"/>

        <div>-</div>
        <input class="self-input" type="text"/>

        <input class="self-input" style="background-color:#97CBFF" type="button" value="查询"/>
    </div>


    <%--<div class="row">--%>
    <%--<div class="col-sm-12">--%>
    <%--<div class="ibox float-e-margins">--%>
    <%--<div class="ibox-content">--%>
    <%--<div class="row">--%>
    <%--<form method="post" role="form">--%>
    <%--<div class="row">--%>
    <%--<div class="col-md-12">--%>
    <%--<div class="col-md-12">--%>
    <%--<div class="form-group">--%>
    <%--<label class="col-md-4 "><h3>Routing</h3></label>--%>
    <%--<label class="col-md-2 "><h3>Carrier Code</h3></label>--%>
    <%--<label class="col-md-2 "><h3>Start Date</h3></label>--%>
    <%--<label class="col-md-2 "><h3>Fee Type</h3></label>--%>
    <%--<label class="col-md-2 "></label>--%>
    <%--</div>--%>
    <%--<div id="coupon">--%>
    <%--<div class="form-group">--%>
    <%--<div class="col-md-4">--%>
    <%--<div class="row">--%>
    <%--<div class="col-md-5">--%>
    <%--<input type="text" id="depart" name="depart"--%>
    <%--class="form-control">--%>
    <%--</div>--%>
    <%--<div class="col-md-5">--%>
    <%--<input type="text" id="arrive" name="arrive"--%>
    <%--class="form-control">--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--<div class="col-md-2">--%>
    <%--<input type="text" id="carrier" name="carrier" class="form-control">--%>
    <%--</div>--%>
    <%--<div class="col-md-2">--%>
    <%--<input type="date" id="start_date" name="start_date"--%>
    <%--class="form-control">--%>
    <%--</div>--%>
    <%--<div class="col-md-2">--%>
    <%--<select id="fee_type" class="form-control">--%>
    <%--<option value="F">F</option>--%>
    <%--<option value="I">I</option>--%>
    <%--</select>--%>
    <%--</div>--%>
    <%--<div class="col-md-2">--%>
    <%--<button onclick="query()" type="button" class="btn btn-primary">--%>
    <%--Query--%>
    <%--</button>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</form>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>

    <div class="row">
        <div class="ibox float-e-margins">
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="tabs-container">
                            <div class="tab-content ">
                                <div id="tab-8" class="tab-pane active">
                                    <table id="contentTable" class="table table-striped table-bordered table-condensed">
                                        <thead>
                                        <tr>
                                            <th>Airport From To VIA</th>
                                            <th>Class</th>
                                            <th>Issue Date From</th>
                                            <th>Issue Date To</th>
                                            <th>Travel Date From</th>
                                            <th>Travel Date To</th>
                                            <th>YQ Amount</th>
                                            <th>YQ Cur</th>
                                            <th>Jrny Geo Spec Indicator</th>
                                            <th>Jrny Geo Spec Loc1_value</th>
                                            <th>Jrny Geo Spec Loc2_value</th>
                                            <th>Rtn To Orig</th>
                                            <th>Sp From To</th>
                                            <th>Sp Loc1_value</th>
                                            <th>Sp Loc2_value</th>
                                            <th>Sp Via Exc Stop T U</th>
                                            <th>Sp Via Exc Stop Time</th>
                                            <th>Sp Via Stp Cnx</th>
                                            <th>Sp Application</th>
                                        </tr>
                                        </thead>
                                        <tbody id="tabA">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../hplus/js/jquery.min.js?v=2.1.4"></script>
<script src="../hplus/js/bootstrap.min.js?v=3.3.6"></script>
<script src="../hplus/js/content.min.js?v=1.0.0"></script>
<script src="../assets2/js/jquery.json-2.3.js"></script>
<script src="../js/Ydc/ydcLayout.js"></script>
<script type="text/javascript">
    var rowsCss = [
        {
            useMarginTop : false,
            except: 'dataList',
            horizontal: [
                {width: '10%', textAlign: 'right'},
                {width: '27%'},
                {width: '10%'},
                {width: '20%'},
                {width: '20%'}]
        },
        {
            horizontal: [
                {width: '10%'},
                {width: '20%'},
                {width: '10%'},
                {width: '20%'},
                {width: '10%', marginLeft: '10%'}]
        }
    ];
    $('.ydc-row').setLayout(rowsCss);

    //    setLayout(rowsCss, new LayoutConfig());
    //    function LayoutConfig() {
    //        this.row = $('.ydc-row');
    //        this.childClass = 'child-row';
    //        this.height = '40px';
    //        this.marginLeft = '0px';
    //        this.textAlign = 'center';
    //        this.fontSize = '14px';
    //        this.marginTop = '20px';
    //    }
    //
    //    function setLayout(rowsCss, layoutConfig) {
    //        $(layoutConfig.row).each(function (i) {
    //            $(this).css({'font-size': '0'});
    //            if (rowsCss[i].firstRow == undefined || !rowsCss[i].firstRow) {
    //                $(this).css({'margin-top': rowsCss[i].marginTop == undefined ? layoutConfig.marginTop : rowsCss[i].marginTop});
    //            }
    //            var child = $(this).children().not('dataList');//$(this).find('.' + layoutConfig.childClass);
    //            var rowHeight = rowsCss[i].height == undefined ? layoutConfig.height : rowsCss[i].height;
    //            child.css({
    //                'font-size': layoutConfig.fontSize,
    //                'display': 'inline-block',
    //                'vertical-align': 'middle',
    //                'height': rowHeight,
    //                'line-height': rowHeight
    //            });
    //            child.each(function (k) {
    //                $(this).css({
    //                    'width': rowsCss[i].horizontal[k].width,
    //                    'text-align': (rowsCss[i].horizontal[k].textAlign == undefined ? layoutConfig.textAlign :
    //                            rowsCss[i].horizontal[k].textAlign),
    //                    'margin-left': (rowsCss[i].horizontal[k].marginLeft == undefined ? layoutConfig.marginLeft : rowsCss[i].horizontal[k].marginLeft)
    //                });
    //            });
    //        });
    //    }
    //        function query() {
    //            var carrier = $("#carrier").val();
    //            var depart = $("#depart").val();
    //            var arrive = $("#arrive").val();
    //
    //            var year1 = $("#start_date").val().substring(2, 4);
    //            var month1 = $("#start_date").val().substring(5, 7);
    //            var day1 = $("#start_date").val().substring(8, 10);
    //
    //            var start_date = year1 + month1 + day1;
    //            var fee_type = document.getElementById("fee_type").value;
    //
    //            console.log(start_date);
    //
    //            $.ajax({
    //                url: '/Ex/golbal/query',
    //                type: 'POST',
    //                data: {depart: depart, carrier: carrier, arrive: arrive, start_date: start_date, fee_type: fee_type},
    //                dataType: 'json',
    //                async: false,
    //                success: function (data) {
    //                    console.log(data);
    //                    var tempA = '';
    //
    //                    $(data).each(function () {
    //                        tempA += '<tr><td>' + this.airport_From_To_VIA + '</td><td>' + this.cla + '</td><td>' + this.issue_Date_From + '</td><td>' + this.issue_Date_To + '</td><td>' + this.travel_date_from + '</td><td>' + this.travel_date_to + '</td><td>' + this.yqAmount + '</td><td>' + this.yqCur + '</td><td>' + this.jrny_geo_spec_indicator + '</td><td>' + this.jrny_geo_spec_loc1_value + '</td><td>' + this.jrny_geo_spec_loc2_value + '</td><td>' + this.rtn_to_orig + '</td><td>' + this.sector_prt_from_to + '</td><td>' + this.sector_prt_loc1_value + '</td><td>' + this.sector_prt_loc2_value + '</td><td>' + this.sector_prt_via_exc_stop_t_u + '</td><td>' + this.sector_prt_via_exc_stop_time + '</td><td>' + this.sector_prt_via_stp_cnx + '</td><td>' + this.service_fee_application + '</td></tr>';
    //                    });
    //
    //                    $('#tabA').html($('#tabA').html() + tempA);
    //
    //                }, error: function (data) {
    //                    console.log(data);
    //                }
    //            });
    //        }
</script>

</body>

</html>