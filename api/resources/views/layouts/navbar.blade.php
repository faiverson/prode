@section('navbar')
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.html">Fiumiccino</a>
        </div>
        <!-- /.navbar-header -->
        <ul class="nav navbar-top-links navbar-right">
            <!-- /.dropdown -->
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu dropdown-user">
                    <li><a href="#"><i class="fa fa-user fa-fw"></i> Mi Perfil</a>
                    </li>
                    <li class="divider"></li>
                    <li><a href="{{ url('/auth/logout')   }}"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                    </li>
                </ul>
                <!-- /.dropdown-user -->
            </li>
            <!-- /.dropdown -->
        </ul>
        <!-- /.navbar-top-links -->
        <div class="navbar-default sidebar" role="navigation">
            <div class="sidebar-nav navbar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="sidebar-search">
                        <div class="input-group custom-search-form">
                            <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                        <!-- /input-group -->
                    </li>
                    <li class="active">
                        <a href="javascript:void(0);"><i class="fa fa-cloud-download fa-fw"></i> Archivos<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse in" aria-expanded="true">
                            <li>
                                <a href="{{ url('/admin/')   }}"><i class="fa fa-arrow-circle-o-right"></i> Listado</a>
                            </li>
                            @if (Helper::access('admin') === true)
                            <li>
                                <a href="{{ url('/admin/files/create') }}"><i class="fa fa-arrow-circle-o-right"></i> Nuevo</a>
                            </li>
                            @endif
                        </ul>
                        <!-- /.nav-second-level -->
                    </li>
                    @if (Helper::access('admin') === true)
                    <li>
                        <a href="javascript:void(0);"><i class="fa fa-user fa-fw"></i> Usuarios<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse" aria-expanded="true">
                            <li><a href="{{ url('/admin/users')   }}"><i class="fa fa-arrow-circle-o-right"></i> Listado</a></li>
                            <li><a href="{{ url('/admin/users/create')   }}"><i class="fa fa-user fa-fw"></i> Agregar usuarios</a></li>
                        </ul>
                        <!-- /.nav-second-level -->
                    </li>
                    <li>
                        <a href="javascript:void(0);"><i class="fa fa-logs fa-eye"></i> Logs<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse" aria-expanded="true">
                            <li><a href="{{ url('/admin/logs/download') }}"><i class="fa fa-eye"></i> Descargas</a></li>
                            <li><a href="{{ url('/admin/logs/emails')   }}"><i class="fa fa-eye"></i> Emails</a></li>
                        </ul>
                        <!-- /.nav-second-level -->
                    </li>
                    @endif
                </ul>
            </div>
            <!-- /.sidebar-collapse -->
        </div>
        <!-- /.navbar-static-side -->
    </nav>
@stop