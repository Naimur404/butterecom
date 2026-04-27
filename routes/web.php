<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\AppsController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChartsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\IconsController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LayoutsController;
use App\Http\Controllers\MapsController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PluginsController;
use App\Http\Controllers\Settings\ProfileController; // kept for settings/profile page
use App\Http\Controllers\TablesController;
use App\Http\Controllers\UiController;
use App\Http\Controllers\WidgetsController;

Route::redirect('/', '/dashboard/ecommerce');

/*
|--------------------------------------------------------------------------
| Authenticated & Permission-Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {

    Route::prefix('admin')->group(function () {
        // Profile
        Route::put('/profile', [AdminController::class, 'updateProfile']);

        // Roles
        Route::post('/roles', [AdminController::class, 'storeRole'])->middleware('permission:manage roles');
        Route::put('/roles/{role}', [AdminController::class, 'updateRole'])->middleware('permission:manage roles');
        Route::delete('/roles/{role}', [AdminController::class, 'destroyRole'])->middleware('permission:manage roles');

        // Users
        Route::post('/users', [AdminController::class, 'storeUser'])->middleware('permission:manage users');
        Route::put('/users/{user}', [AdminController::class, 'updateUser'])->middleware('permission:manage users');
        Route::delete('/users', [AdminController::class, 'bulkDestroyUsers'])->middleware('permission:manage users');
        Route::delete('/users/{user}', [AdminController::class, 'destroyUser'])->middleware('permission:manage users');
        Route::put('/users/{user}/roles', [AdminController::class, 'assignRoles'])->middleware('permission:manage roles|manage users');

        // Permissions
        Route::delete('/permissions', [AdminController::class, 'bulkDestroyPermissions'])->middleware('permission:manage permissions');
        Route::delete('/permissions/{permission}', [AdminController::class, 'destroyPermission'])->middleware('permission:manage permissions');
    });

    Route::prefix('dashboard')->middleware(['permission:view dashboard'])->group(function () {
        Route::get('/ecommerce', [DashboardController::class, 'ecommerce']);
        Route::get('/projects', [DashboardController::class, 'projects']);
    });

    Route::prefix('apps')->group(function () {
        Route::get('/api-keys', [AppsController::class, 'apiKeys'])->middleware('permission:view api-keys');
        Route::get('/calendar', [AppsController::class, 'calendar'])->middleware('permission:view calendar');
        Route::get('/chat', [AppsController::class, 'chat'])->middleware('permission:view chat');

        // CRM
        Route::prefix('crm')->middleware(['permission:view crm'])->group(function () {
            Route::get('/activities', [AppsController::class, 'crmActivities']);
            Route::get('/campaign', [AppsController::class, 'crmCampaign']);
            Route::get('/contacts', [AppsController::class, 'crmContacts']);
            Route::get('/customers', [AppsController::class, 'crmCustomers']);
            Route::get('/deals', [AppsController::class, 'crmDeals']);
            Route::get('/estimations', [AppsController::class, 'crmEstimations']);
            Route::get('/leads', [AppsController::class, 'crmLeads']);
            Route::get('/opportunities', [AppsController::class, 'crmOpportunities']);
            Route::get('/pipeline', [AppsController::class, 'crmPipeline']);
            Route::get('/proposals', [AppsController::class, 'crmProposals']);
        });

        // Ecommerce
        Route::prefix('ecommerce')->middleware(['permission:view ecommerce'])->group(function () {
            Route::get('/attributes', [AppsController::class, 'ecommerceAttributes']);
            Route::get('/cart', [AppsController::class, 'ecommerceCart']);
            Route::get('/categories', [AppsController::class, 'ecommerceCategories']);
            Route::get('/customers', [AppsController::class, 'ecommerceCustomers']);
            Route::get('/order-add', [AppsController::class, 'ecommerceOrderAdd']);
            Route::get('/order-details', [AppsController::class, 'ecommerceOrderDetails']);
            Route::get('/orders', [AppsController::class, 'ecommerceOrders']);
            Route::get('/product-add', [AppsController::class, 'ecommerceProductAdd']);
            Route::get('/product-details', [AppsController::class, 'ecommerceProductDetails']);
            Route::get('/products', [AppsController::class, 'ecommerceProducts']);
            Route::get('/products-grid', [AppsController::class, 'ecommerceProductsGrid']);
            Route::get('/refunds', [AppsController::class, 'ecommerceRefunds']);
            Route::get('/reviews', [AppsController::class, 'ecommerceReviews']);
            Route::get('/seller-details', [AppsController::class, 'ecommerceSellerDetails']);
            Route::get('/sellers', [AppsController::class, 'ecommerceSellers']);
        });

        // Email
        Route::prefix('email')->middleware(['permission:view email'])->group(function () {
            Route::get('/compose', [AppsController::class, 'emailCompose']);
            Route::get('/details', [AppsController::class, 'emailDetails']);
            Route::get('/inbox', [AppsController::class, 'emailInbox']);
        });

        Route::get('/file-manager', [AppsController::class, 'fileManager'])->middleware('permission:view file-manager');

        // Invoice
        Route::prefix('invoice')->middleware(['permission:view invoices'])->group(function () {
            Route::get('/create', [AppsController::class, 'invoiceCreate']);
            Route::get('/details', [AppsController::class, 'invoiceDetails']);
            Route::get('/list', [AppsController::class, 'invoiceList']);
        });

        Route::get('/outlook', [AppsController::class, 'outlook'])->middleware('permission:view email');
        Route::get('/social-feed', [AppsController::class, 'socialFeed'])->middleware('permission:view social-feed');
        Route::get('/users/profile', [AppsController::class, 'usersProfile']);

        // Tickets / Support
        Route::prefix('ticket')->middleware(['permission:view tickets'])->group(function () {
            Route::get('/create', [AppsController::class, 'ticketCreate']);
            Route::get('/details', [AppsController::class, 'ticketDetails']);
            Route::get('/list', [AppsController::class, 'ticketList']);
        });

        // Users Management (requires manage users or manage roles)
        Route::prefix('users')->middleware(['permission:view users'])->group(function () {
            Route::get('/account-settings', [AppsController::class, 'usersAccountSettings']);
            Route::get('/contacts', [AppsController::class, 'usersContacts']);
            Route::get('/user-management', [AppsController::class, 'usersManagement'])->middleware('permission:manage users');
            Route::get('/permissions', [AppsController::class, 'usersPermissions'])->middleware('permission:manage permissions');
            Route::get('/role-details', [AppsController::class, 'usersRoleDetails'])->middleware('permission:manage roles');
            Route::get('/roles', [AppsController::class, 'usersRoles'])->middleware('permission:manage roles');
        });
    });

    Route::prefix('charts')->middleware(['permission:view charts'])->group(function () {
        Route::get('/apex/area', [ChartsController::class, 'apexArea']);
        Route::get('/apex/bar', [ChartsController::class, 'apexBar']);
        Route::get('/apex/boxplot', [ChartsController::class, 'apexBoxplot']);
        Route::get('/apex/bubble', [ChartsController::class, 'apexBubble']);
        Route::get('/apex/candlestick', [ChartsController::class, 'apexCandlestick']);
        Route::get('/apex/column', [ChartsController::class, 'apexColumn']);
        Route::get('/apex/funnel', [ChartsController::class, 'apexFunnel']);
        Route::get('/apex/heatmap', [ChartsController::class, 'apexHeatmap']);
        Route::get('/apex/line', [ChartsController::class, 'apexLine']);
        Route::get('/apex/mixed', [ChartsController::class, 'apexMixed']);
        Route::get('/apex/pie', [ChartsController::class, 'apexPie']);
        Route::get('/apex/polar-area', [ChartsController::class, 'apexPolarArea']);
        Route::get('/apex/radar', [ChartsController::class, 'apexRadar']);
        Route::get('/apex/radialbar', [ChartsController::class, 'apexRadialbar']);
        Route::get('/apex/range', [ChartsController::class, 'apexRange']);
        Route::get('/apex/scatter', [ChartsController::class, 'apexScatter']);
        Route::get('/apex/slope', [ChartsController::class, 'apexSlope']);
        Route::get('/apex/sparklines', [ChartsController::class, 'apexSparklines']);
        Route::get('/apex/timeline', [ChartsController::class, 'apexTimeline']);
        Route::get('/apex/treemap', [ChartsController::class, 'apexTreemap']);
        Route::get('/chartjs/area', [ChartsController::class, 'chartjsArea']);
        Route::get('/chartjs/bar', [ChartsController::class, 'chartjsBar']);
        Route::get('/chartjs/line', [ChartsController::class, 'chartjsLine']);
        Route::get('/chartjs/other', [ChartsController::class, 'chartjsOther']);
    });

    Route::prefix('form')->middleware(['permission:view forms'])->group(function () {
        Route::get('/elements', [FormController::class, 'elements']);
        Route::get('/fileuploads', [FormController::class, 'fileuploads']);
        Route::get('/layout', [FormController::class, 'layout']);
        Route::get('/other-plugin', [FormController::class, 'otherPlugin']);
        Route::get('/pickers', [FormController::class, 'pickers']);
        Route::get('/range-slider', [FormController::class, 'rangeSlider']);
        Route::get('/select', [FormController::class, 'select']);
        Route::get('/text-editors', [FormController::class, 'textEditors']);
        Route::get('/validation', [FormController::class, 'validation']);
        Route::get('/wizard', [FormController::class, 'wizard']);
    });

    Route::prefix('icons')->middleware(['permission:view icons'])->group(function () {
        Route::get('/flags', [IconsController::class, 'flags']);
        Route::get('/lucide', [IconsController::class, 'lucide']);
        Route::get('/tabler', [IconsController::class, 'tabler']);
    });

    Route::prefix('layouts')->middleware(['permission:view layouts'])->group(function () {
        Route::get('/boxed', [LayoutsController::class, 'boxed']);
        Route::get('/compact', [LayoutsController::class, 'compact']);
        Route::get('/horizontal', [LayoutsController::class, 'horizontal']);
        Route::get('/preloader', [LayoutsController::class, 'preloader']);
        Route::get('/scrollable', [LayoutsController::class, 'scrollable']);
        Route::get('/sidebar-compact', [LayoutsController::class, 'sidebarCompact']);
        Route::get('/sidebar-dark', [LayoutsController::class, 'sidebarDark']);
        Route::get('/sidebar-gradient', [LayoutsController::class, 'sidebarGradient']);
        Route::get('/sidebar-gray', [LayoutsController::class, 'sidebarGray']);
        Route::get('/sidebar-image', [LayoutsController::class, 'sidebarImage']);
        Route::get('/sidebar-no-icons', [LayoutsController::class, 'sidebarNoIcons']);
        Route::get('/sidebar-offcanvas', [LayoutsController::class, 'sidebarOffcanvas']);
        Route::get('/sidebar-on-hover', [LayoutsController::class, 'sidebarOnHover']);
        Route::get('/sidebar-on-hover-active', [LayoutsController::class, 'sidebarOnHoverActive']);
        Route::get('/sidebar-with-lines', [LayoutsController::class, 'sidebarWithLines']);
        Route::get('/topbar-gradient', [LayoutsController::class, 'topbarGradient']);
        Route::get('/topbar-gray', [LayoutsController::class, 'topbarGray']);
        Route::get('/topbar-light', [LayoutsController::class, 'topbarLight']);
    });

    Route::prefix('maps')->middleware(['permission:view maps'])->group(function () {
        Route::get('/leaflet', [MapsController::class, 'leaflet']);
        Route::get('/vector', [MapsController::class, 'vector']);
    });

    Route::prefix('pages')->middleware(['permission:view pages'])->group(function () {
        Route::get('/coming-soon', [PagesController::class, 'comingSoon']);
        Route::get('/empty', [PagesController::class, 'empty']);
        Route::get('/faq', [PagesController::class, 'faq']);
        Route::get('/pricing', [PagesController::class, 'pricing']);
        Route::get('/privacy-policy', [PagesController::class, 'privacyPolicy']);
        Route::get('/search-results', [PagesController::class, 'searchResults']);
        Route::get('/terms-conditions', [PagesController::class, 'termsConditions']);
        Route::get('/timeline', [PagesController::class, 'timeline']);
    });

    Route::prefix('plugins')->middleware(['permission:view plugins'])->group(function () {
        Route::get('/animation', [PluginsController::class, 'animation']);
        Route::get('/clipboard', [PluginsController::class, 'clipboard']);
        Route::get('/pass-meter', [PluginsController::class, 'passMeter']);
        Route::get('/pdf-viewer', [PluginsController::class, 'pdfViewer']);
        Route::get('/sortable', [PluginsController::class, 'sortable']);
        Route::get('/sweet-alerts', [PluginsController::class, 'sweetAlerts']);
        Route::get('/tour', [PluginsController::class, 'tour']);
        Route::get('/tree-view', [PluginsController::class, 'treeView']);
        Route::get('/video-player', [PluginsController::class, 'videoPlayer']);
    });

    Route::prefix('tables')->middleware(['permission:view tables'])->group(function () {
        Route::get('/custom', [TablesController::class, 'custom']);
        Route::get('/datatables/ajax', [TablesController::class, 'datatablesAjax']);
        Route::get('/datatables/basic', [TablesController::class, 'datatablesBasic']);
        Route::get('/datatables/checkbox-select', [TablesController::class, 'datatablesCheckboxSelect']);
        Route::get('/datatables/child-rows', [TablesController::class, 'datatablesChildRows']);
        Route::get('/datatables/column-searching', [TablesController::class, 'datatablesColumnSearching']);
        Route::get('/datatables/columns', [TablesController::class, 'datatablesColumns']);
        Route::get('/datatables/export-data', [TablesController::class, 'datatablesExportData']);
        Route::get('/datatables/fixed-columns', [TablesController::class, 'datatablesFixedColumns']);
        Route::get('/datatables/fixed-header', [TablesController::class, 'datatablesFixedHeader']);
        Route::get('/datatables/javascript', [TablesController::class, 'datatablesJavascript']);
        Route::get('/datatables/rendering', [TablesController::class, 'datatablesRendering']);
        Route::get('/datatables/rows-add', [TablesController::class, 'datatablesRowsAdd']);
        Route::get('/datatables/scroll', [TablesController::class, 'datatablesScroll']);
        Route::get('/datatables/select', [TablesController::class, 'datatablesSelect']);
        Route::get('/static', [TablesController::class, 'static']);
    });

    Route::prefix('ui')->middleware(['permission:view components'])->group(function () {
        Route::get('/accordions', [UiController::class, 'accordions']);
        Route::get('/alerts', [UiController::class, 'alerts']);
        Route::get('/badges', [UiController::class, 'badges']);
        Route::get('/breadcrumb', [UiController::class, 'breadcrumb']);
        Route::get('/buttons', [UiController::class, 'buttons']);
        Route::get('/cards', [UiController::class, 'cards']);
        Route::get('/carousel', [UiController::class, 'carousel']);
        Route::get('/collapse', [UiController::class, 'collapse']);
        Route::get('/colors', [UiController::class, 'colors']);
        Route::get('/dropdowns', [UiController::class, 'dropdowns']);
        Route::get('/grid', [UiController::class, 'grid']);
        Route::get('/images', [UiController::class, 'images']);
        Route::get('/links', [UiController::class, 'links']);
        Route::get('/list-group', [UiController::class, 'listGroup']);
        Route::get('/modals', [UiController::class, 'modals']);
        Route::get('/notifications', [UiController::class, 'notifications']);
        Route::get('/offcanvas', [UiController::class, 'offcanvas']);
        Route::get('/pagination', [UiController::class, 'pagination']);
        Route::get('/placeholders', [UiController::class, 'placeholders']);
        Route::get('/popovers', [UiController::class, 'popovers']);
        Route::get('/progress', [UiController::class, 'progress']);
        Route::get('/spinners', [UiController::class, 'spinners']);
        Route::get('/tabs', [UiController::class, 'tabs']);
        Route::get('/tooltips', [UiController::class, 'tooltips']);
        Route::get('/typography', [UiController::class, 'typography']);
        Route::get('/utilities', [UiController::class, 'utilities']);
        Route::get('/videos', [UiController::class, 'videos']);
    });

    Route::prefix('widgets')->middleware(['permission:view widgets'])->group(function () {
        Route::get('/', [WidgetsController::class, 'index']);
    });

}); // end auth middleware

/*
|--------------------------------------------------------------------------
| Public Routes (No Auth Required)
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::get('/delete-account', [AuthController::class, 'deleteAccount']);
    Route::get('/lock-screen', [AuthController::class, 'lockScreen']);
    Route::get('/login-pin', [AuthController::class, 'loginPin']);
    Route::get('/new-pass', [AuthController::class, 'newPass']);
    Route::get('/reset-pass', [AuthController::class, 'resetPass']);
    Route::get('/sign-in', [AuthController::class, 'signIn']);
    Route::get('/sign-up', [AuthController::class, 'signUp']);
    Route::get('/split/delete-account', [AuthController::class, 'splitDeleteAccount']);
    Route::get('/split/lock-screen', [AuthController::class, 'splitLockScreen']);
    Route::get('/split/login-pin', [AuthController::class, 'splitLoginPin']);
    Route::get('/split/new-pass', [AuthController::class, 'splitNewPass']);
    Route::get('/split/reset-pass', [AuthController::class, 'splitResetPass']);
    Route::get('/split/sign-in', [AuthController::class, 'splitSignIn']);
    Route::get('/split/sign-up', [AuthController::class, 'splitSignUp']);
    Route::get('/split/success-mail', [AuthController::class, 'splitSuccessMail']);
    Route::get('/split/two-factor', [AuthController::class, 'splitTwoFactor']);
    Route::get('/success-mail', [AuthController::class, 'successMail']);
    Route::get('/two-factor', [AuthController::class, 'twoFactor']);
});

Route::prefix('error')->group(function () {
    Route::get('/400', [ErrorController::class, 'error400']);
    Route::get('/401', [ErrorController::class, 'error401']);
    Route::get('/403', [ErrorController::class, 'error403']);
    Route::get('/404', [ErrorController::class, 'error404']);
    Route::get('/408', [ErrorController::class, 'error408']);
    Route::get('/500', [ErrorController::class, 'error500']);
    Route::get('/maintenance', [ErrorController::class, 'maintenance']);
});

Route::prefix('landing')->group(function () {
    Route::get('/', [LandingController::class, 'index']);
});

