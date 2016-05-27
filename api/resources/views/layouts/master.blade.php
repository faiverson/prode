<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Panel de Adminstracion de Edificios Fiumiccino">
    <meta name="author" content="Fabian Torres">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>@yield('title')</title>
    <link href="{{ asset('assets/css/vendors.css')}}" rel="stylesheet" type="text/css">
    <link href="{{ asset('assets/css/styles.css')}}" rel="stylesheet" type="text/css">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <div id="wrapper">
        <!-- Navigation -->
        @include('layouts.navbar')
        @yield('navbar')
        <div id="page-wrapper">
            @yield('content')
        </div>
        <!-- /#page-wrapper -->
    </div>
    <script src="{{ asset('assets/scripts/admin/vendors.js')}}"></script>
    <script src="{{ asset('assets/scripts/common/common.js')}}"></script>
    @yield('scripts')
</body>
</html>
