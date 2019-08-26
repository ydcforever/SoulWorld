<html>
<head>
    <title>DBTable</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script type="text/javascript" src="js/DynamicLoad/dynamicLoading.js"></script>
    <script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
    <script type="text/javascript">
        $.ajax({
            url: '/table/queryTable.do',
            async: false,
            type: "get",
            dataType: "json",
            success: function (data) {
                console.log("success");
                console.log(data);
            },
            error: function () {
                console.log("1");
            }
        });
    </script>
</head>

<body>
<h2>Hello World!</h2>
</body>
</html>
