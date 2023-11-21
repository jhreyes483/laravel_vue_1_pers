//window.Vue = require('vue');

import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

import Medic from '../components/Medic/Board'



/*
import Users from '../components/Users/View'
import VariablesOfMemberShip from '../components/GestionIt/View'
import UsersAutoLogin from '../components/UsersAutoLogin/View'
import Dashboard from '../components/Dashboard/View'
import Warehouse from '../components/Logistics/Warehouse/View'
import Picker from '../components/Logistics/Picker/Picker'
import Domiciliary from '../components/Logistics/Domiciliary/View'
import TimeDomiciliaries from '../components/Logistics/TimeDomiciliary/View'
// import Orders from '../components/Orders/View'
import Orders from '../components/SAC/Orders/View'
import Categories from '../components/Orders/categories/View'
import Phones from '../components/Orders/Phones/View'
import Type_products from '../components/Orders/Type_products/View'
import Country_pets from '../components/Orders/Country_pets/view'
import CasosPQRS from '../components/SAC/Casos-PQRS/View'
import Promotions from '../components/Marketing/Promotions/View'
import Banners from '../components/Marketing/Banners/View'
import BannersV1 from '../components/Marketing/BannersV1/ViewV1'
import Memberships from '../components/Marketing/Memberships/View'
import Coupons from '../components/Marketing/Coupons/View'
import Used_Coupons from '../components/Marketing/Coupons/Used_coupons'
import Support from '../components/Support/View'
import Times_Zones from '../components/Logistics/times_zones/View'
import Country from '../views/Country'
import TermsAndConditions from '../components/Marketing/TermsAndConditions/TermsAndConditions.vue'
import Cities from '../components/ConfigInit/City/View'
import Rules from '../components/ConfigInit/Rules/View'
import Scheduling from '../components/ConfigInit/Scheduling/View'
import Brands from '../components/Orders/Brands/View'
import SorterBrands from '../components/Orders/Brands/SorterBrands'
import Products from "../components/Briefcase/Product/View"
import Services from "../components/Services/View"
import Service_Providers from "../components/ServiceProviders/View"
import new_provider from "../components/ServiceProviders/NewProvider"
import UserInfo from "../components/Users/UserInfo"

import Planner from '../components/Logistics/Planner/View'
import PhoneOrder from '../components/SAC/PhoneOrder/View'
import OrderView from '../components/PhoneOrderV2/View'
import OrderViewMW from '../components/PhoneOrderMW/View'
// import PhoneOrderV2 from '../components/PhoneOrderV2/PhoneOrder'
import OrderDetail from '../components/PhoneOrderV2/OrderDetail'
import OrderDetailMW from '../components/PhoneOrderMW/OrderDetail'
import ServicesV1 from '../components/SAC/ServicesV1/View'
import UsersMemberships from '../components/SAC/Memberships/View'
import OrdersMembership from '../components/SAC/OrdersMembership/View'
import OrdersBalance from '../components/SAC/OrdersBalance/View'
import ActiveSubscriptionOrders from '../components/SAC/SubscriptionOrders/ActiveSubscriptionOrders'
import logs from '../components/Management/Logs/View'
import Showers from '../components/SAC/ExpressShower/View'
import ShowerServices from '../components/SAC/ExpressShower/Services'
import SchedulePetshop from '../components/SAC/ExpressShower/Schedule'
import VetServices from '../components/SAC/VetAtHome/Services'
import VetServicesDetail from '../components/SAC/VetAtHome/VetServiceDetail'
import NewVetServices from '../components/SAC/VetAtHome/NewService'
import ScheduleVet from '../components/SAC/VetAtHome/Schedule'
import Referrals from '../components/Marketing/Referrals/View'
import ReferralsList from '../components/Marketing/Referrals/List'
import RecomendedSubcategories from '../components/Marketing/Recommended_SubCategories/View'
import FavoriteProducts from '../components/Marketing/FavoriteProducts/View'
import UniverseFullOffers from '../components/Marketing/UniverseFullOffers/View'
import ProductCompletePurchase from '../components/Marketing/ProductCompletePurchase/View'
import PhoneOrderRefactor from '../components/PhoneOrderRefactor/PhoneOrder'
import ProductInterestPurchase from '../components/Marketing/ProductInterestPurchase/View'
import FinancialDomiciliary from '../components/Financial/Domiciliary/View'
import PaymentsGateway from '../components/Management/PaymentsGateway/View'
import Supplier from '../components/Briefcase/Supplier/View'
import SupplierEdit from '../components/Briefcase/Supplier/SupplierEdit'
import SupplierCreate from '../components/Briefcase/Supplier/Create'
import jobs from '../components/Management/Jobs/View'
import FailedJobs from '../components/Management/FailedJobs/View'
import ProductReturns from '../components/Inventory/ProductReturns/View'
import ProductReturnsDetail from '../components/Inventory/ProductReturns/ProductReturnsDetail'
import ErpIntegration from '../components/Management/ErpIntegration/View'
import Migrations from '../components/Management/Migration/View'
import UserProfile from '../components/UserProfile/View'
import ViewMapsOrder from '../components/Logistics/ViewMapsOrders/View'
import ModulesDocumentation from '../components/ModulesDocumentation/View'
import ExportFeed from '../components/ExportFeed/View'
import FreeSample from '../components/Marketing/FreeSample/View'
import CreateOrderReturn from '../components/OrderReturns/Create'
import TracingErp from '../components/Management/ErpIntegration/Tracing'
import FreeDeliveries from '../components/Marketing/FreeDelivery/View'
import PlanOrders from '../components/Plan/Orders/View'
import PlanOrdersDetails from '../components/Plan/Orders/OrderDetails'
import PlanAssist from '../components/Plan/Assist/View'
import CardAssist from '../components/Plan/Assist_cards/View'
import RefundVetcare from '../components/Plan/Refund/View'
import PlanVetcare from '../components/Plan/Vetcare/View'
import PlanAssistsRefund from '../components/Plan/Assists_Request/View'
import PickerAssignment from '../components/Logistics/Picker/View'
import Shopper from '../components/Logistics/Picker/Shopper'
import Receiver from '../components/Logistics/Picker/Receiver'
import AutomaticAssignment from '../components/Logistics/AutomaticAssignment/View'
import PickingBoard from '../components/Logistics/Picker/PickingBoard'
import PhoneOrderVetCare from '../components/Plan/PhoneOrder/View'
import RefundRequestVetCare from '../components/Plan/Refund_Request/View'
import RefundRequestVetCareDetails from '../components/Plan/Refund_Request/RefundRequestDetails'
import AssistRequestVetCareDetails from '../components/Plan/Assists_Request/AssistRequestDetails'
import Warehouse_SP from '../components/Logistics/Warehouse/View_SP'
import Warehouse_MW from '../components/Logistics/Warehouse/View_MW'
import CategoryBanners from '../components/Marketing/CategoryBanners/View'
import PaymentDomiciliary from '../components/Financial/Payments/View'
import PlannerSP from '../components/Logistics/Planner/View_SP'
import Beetrack from '../components/Logistics/Planner/View_Beetrack'
import PickerAssignmentSP from '../components/Logistics/Picker/View_SP'
import Domiciliary_SP from '../components/Logistics/Domiciliary/View_SP'
import TimeZonesCitiesMb from '../components/Logistics/times_zones/MultiWarehouse/View.vue'
import TimeZonesCities from '../components/Logistics/TimeZoneCities/View.vue'
import SyncStock from '../components/Briefcase/Erp/SyncStock.vue'
import PickerMW from '../components/Logistics/Picker/PickerMW'
import Topics from '../components/Marketing/Topics/View'
import TopicDetail from '../components/Marketing/Topics/TopicDetail'
import MembershipCoupons from '../components/Marketing/MembershipCoupons/View'
import DebtDetail from '../components/Financial/Payments/DebtDetail'

import AdminWarehousesWMS from '../components/Logistics/WarehouseWms/View'
import Plataforms from '../components/Alliances/Plataforms/View'

import AdminWarehouses from '../components/Logistics/Warehouse/View_admin'
import PaymentMethods from '../components/ConfigInit/PaymentMethods/View'

import TypeDocument from '../components/ConfigInit/Document/View'
import PhoneOrderMW from '../components/PhoneOrderMW/PhoneOrder'
import ShopperMW from '../components/Logistics/Picker/ShopperMW'
import ReceiverMW from '../components/Logistics/Picker/ReceiverMW'
import PickingBoardMW from '../components/Logistics/Picker/PickingBoardMW'
import ProductsMW from "../components/Briefcase/Product/View_MW"
import ReturnOrderMW from '../components/ReturnOrderMW/View'
import PayDebt from '../components/Financial/Payments/ViewPay'

import Packing from '../components/Logistics/Packing/View'
import PackingBoard from '../components/Logistics/Packing/Board'
import ReturnProductsMW from '../components/Inventory/ProductReturns/ViewMW'
import ProductReturnsDetailMW from '../components/Inventory/ProductReturns/ProductReturnsDetailMW'
import CommandScript from '../views/CommandScripts'

import ServicesV2 from '../components/SAC/Services/View'
import ProvidersV2 from '../components/SAC/Services/Providers'
import InfoOrderService from '../components/SAC/Services/OrderServices'
import RenewalSettings from '../components/Marketing/Memberships/RenewalSettings'
import InventaryCompromised from '../components/InventoryCommitted/View'
import Synonyms from '../components/Marketing/Synonyms/View'
//Módulo de rutas
import MarketingRoutes from './modules/marketing'
import FinancialRoutes from './modules/financial'
import stateFlow from '../components/StateFlow/View'
import References from '../components/Alliances/References/View'

// Modulo de ubicacion de referencias
import LocationReferences from '../components/Logistics/Locations/View'

//Modulo de administración de motivos por cambios de estado New
import ReasonsChange from '../components/Logistics/Reasons_change/View'

// Tabla de rutas
import RouteTable from '../components/Logistics/RouteTable/View'


// CEDI
import PickerAssignCedi from '../components/Logistics/Cedi/Picker/View'
import PickingCedi from '../components/Logistics/Cedi/Picker/Picking'
import OrderTransfer from '../components/Logistics/Cedi/OrderTransfer/View'
import OrderTransferDetail from '../components/Logistics/Cedi/OrderTransfer/Details'
import TransactionFailedNetsuite from '../components/Inventory/TransactionFailedNetsuite/View'
import Partialtables from '../components/Inventory/PartialTables/View'
import Breakdownstables from '../components/Inventory/BreakdownsTables/View'

import Others from '../components/GestionIt/Others/View'

// RECATEGORIZATION
import Recategorization from '../components/Briefcase/Recategorization/View'
//ULTIMO ANTOJO
import LastCraving from '../components/Marketing/Lastcraving/View'
// ETA
import ControlTower from '../components/Logistics/ControlTower/View'
import ControlsLmfs from '../components/Logistics/ControlsLmfs/View'

import GlobalImages from "../components/GlobalUploadImages/View"

//CARGA MASIVA LC
import LaikaCoinsBulkLoad from "../components/Marketing/LaikaCoinsBulkLoad/View"

// WMS
import LogsWms from "../components/Management/LogsWms/ViewTable"

//auth functions
import {
    can,
    existToken,
    beforeEnter
} from './functions/auth'

const baseRoutes = [{
        path: '/gateway',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/gateway/variablesofmembership',
        name: 'variablesofmembership',
        component: VariablesOfMemberShip,
        // beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_membership_variables')
    },
    {
        path: '/gateway/LaikaCoinsBulkLoad',
        name: 'LaikaCoinsBulkLoad',
        component: LaikaCoinsBulkLoad,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_bulk_load_lc')
    },
    {
        path: '/gateway/lastcraving',
        name: 'lastcraving',
        component: LastCraving,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_last_craving')
    },
    {
        path: '/gateway/recategorization',
        name: 'recategorization',
        component: Recategorization,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_recategorization')
    },
    {
        path: '/gateway/transaction_failed_netsuite',
        name: 'TransactionFailedNetsuite',
        component: TransactionFailedNetsuite,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_transaction_failed_netsuite')
    },
    {
        path: '/gateway/partialtables',
        name: 'partialtables',
        component: Partialtables,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_partial_tables')
    },
    {
        path: '/gateway/breakdownstables',
        name: 'breakdownstables',
        component: Breakdownstables,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_breakdowns_tables')
    },
    {
        path: '/gateway/locations',
        name: 'Locations',
        component: LocationReferences,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_references_locations')

    },
    {
        path: '/gateway/control_tower',
        name: 'control_tower',
        component: ControlTower,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_control_tower')

    },
    {
        path: '/gateway/control_lmfs',
        name: 'control_lmfs',
        component: ControlsLmfs,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_control_lmfs')

    },
    {
        path: '/gateway/reasonschange',
        name: 'reasonschange',
        component: ReasonsChange,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_reasons_change')

    },

    // {
    //     path: '/gateway/orders',
    //     name: 'orders',
    //     component: OrderView,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_orders')
    // },
    {
        path: '/gateway/support',
        name: 'support',
        component: Support
    },
    {
        path: '/gateway/allusers',
        name: 'allusers',
        component: Users,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_users')
    },
    {
        path: '/gateway/autologinusers',
        name: 'allusers',
        component: UsersAutoLogin,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_usersautologin')
    },
    {
        path: '/gateway/warehouse',
        name: 'warehouse',
        component: Warehouse,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_order_warehouse')
    },
    {
        path: '/gateway/routeTable',
        name: 'route_table',
        component: RouteTable,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'route_table')
    },
    {
        path: '/gateway/TimeDomiciliaries',
        name: 'timedomiciliary',
        component: TimeDomiciliaries,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_time_domiciliaries')
    },

    // {
    //     path: '/gateway/picking',
    //     name: 'picking',
    //     component: Picker,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_picker')
    // },


    // {
    //     path: '/gateway/domiciliary',
    //     name: 'domiciliary',
    //     component: Domiciliary,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_domiciliaries')
    // },

    {
        path: '/gateway/pqrs',
        name: 'pqrs',
        component: CasosPQRS,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_pqrs')
    },
    {
        path: '/gateway/promotions',
        name: 'promotions',
        component: Promotions,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_promotions')
    },
    {
        path: '/gateway/banners',
        name: 'banners',
        component: Banners,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_banners')
    },
    {
        path: '/gateway/bannersv1',
        name: 'bannersv1',
        component: BannersV1,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_banners_v1')

    },
    {
        path: '/gateway/memberships',
        name: 'memberships',
        component: Memberships,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_membership')
    },
    {
        path: '/gateway/coupons',
        name: 'coupons',
        component: Coupons,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_coupon')

    },
    {
        path: '/gateway/used_coupon/:id',
        name: 'used_coupon',
        component: Used_Coupons,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_used_coupon')

    },
    // {
    //     path: '/gateway/services',
    //     name: 'services',
    //     component: Services
    // },
    // {
    //     path: '/gateway/service_providers',
    //     name: 'service_providers',
    //     component: Service_Providers
    // },
    // {
    //     path: '/gateway/service_providers',
    //     name: 'service_providers',
    //     component: Service_Providers
    // },
    // {
    //     path: '/gateway/times_zone_cities',
    //     name: 'times_zones',
    //     component: Times_Zones,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_times_zone_cities')
    // },
    {
        path: '/gateway/times_zone_cities_mb',
        name: 'times_zone_cities_mb',
        component: TimeZonesCitiesMb,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_times_zone_cities_mw')
    },
    {
        path: '/gateway/times_zone_cities',
        name: 'times_zone_cities',
        component: TimeZonesCities,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_times_zone_cities_mw')
    },
    {
        path: '/gateway/plataforms',
        name: 'plataforms',
        component: Plataforms,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'plataforms')
    },
    // {
    //     path: '/gateway/planner',
    //     name: 'planner',
    //     component: Planner,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'planner')
    // },
    {
        path: '/gateway/country',
        name: 'country',
        component: Country,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_country')

    },
    {
        path: '/gateway/cities',
        name: 'cities',
        component: Cities,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_cities')

    },
    {
        path: '/gateway/rules',
        name: 'rules',
        component: Rules,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_rules')

    },
    {
        path: '/gateway/sheduling',
        name: 'sheduling',
        component: Scheduling,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_sheduling')

    },
    {
        path: '/gateway/products',
        name: 'products',
        component: Products,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_products')


    },
    {
        path: '/gateway/country_pets',
        name: 'country_pets',
        component: Country_pets,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_pets')

    },
    {
        path: '/gateway/type_products',
        name: 'type_products',
        component: Type_products,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_type_products')

    },
    {
        path: '/gateway/phones',
        name: 'phones',
        component: Phones
    },
    {
        path: '/gateway/brands',
        name: 'brands',
        component: Brands,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_brands')

    },
    {
        path: '/gateway/sorter_brands',
        name: 'sorter_brands',
        component: SorterBrands,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_sorter_brands')

    },
    {
        path: '/gateway/categories',
        name: 'categories',
        component: Categories,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_category_cities')

    },
    // {
    //     path: '/gateway/country_pets',
    //     name: 'country_pets',
    //     component: Country_pets
    // }

    // {
    //     path: "/gateway/users",
    //     name: "users",
    //     component: Users,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next,'view_users')

    // },
    {
        path: "/gateway/user_info/:id",
        name: "UserInfo",
        component: UserInfo,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_customer_profile')

    },
    {
        path: "/gateway/product_interest_purchase",
        name: "ProductInterestPurchase",
        component: ProductInterestPurchase,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_product_interest_purchase')

    },
    // {
    //     path: '/gateway/phone_order',
    //     name: 'phone_order',
    //     component: PhoneOrderV2,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'create_and_view_phone_order')
    // },
    // {
    //     path: '/gateway/order_detail_mw/:id',
    //     name: 'order_detail',
    //     component: OrderDetail,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_order_detail')
    // },
    {
        path: '/gateway/users_memberships',
        name: 'users_memberships',
        component: UsersMemberships,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_users_memberships')
    },
    {
        path: '/gateway/orders_membership',
        name: 'orders_memberships',
        component: OrdersMembership,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_orders_membership')
    },
    {
        path: '/gateway/active-subscription-orders',
        name: 'active-subscription-orders',
        component: ActiveSubscriptionOrders,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_generate_subscription_orders')
    },
    {
        path: '/gateway/logsWms',
        name: 'logs_wms',
        component: LogsWms,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'logs_wms')
    },
    {
        path: '/gateway/Logs',
        name: 'logs',
        component: logs,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_logs')
    },
    {
        path: '/gateway/it/command_scripts',
        name: 'command_scripts',
        component: CommandScript,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_command_scripts')
    },
    {
        path: '/gateway/orders_balance',
        name: 'orders_balance',
        component: OrdersBalance,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_orders_balance')
    },
    {
        path: '/gateway/showers',
        name: 'showers',
        component: Showers,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_express_shower')
    },
    {
        path: '/gateway/shower_services',
        name: 'shower_services',
        component: ShowerServices,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_shower_express')
    },
    {
        path: '/gateway/schedule_petshop',
        name: 'schedule_petshop',
        component: SchedulePetshop,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_schedule_petshop')
    },
    {
        path: '/gateway/vet_at_home_services',
        name: 'vet_at_home_services',
        component: VetServices,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_vet_at_home')
    },
    {
        path: '/gateway/vet_at_home_service_detail/:id',
        name: 'vet_at_home_service_detail',
        component: VetServicesDetail,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_vet_at_home_detail')
    },
    {
        path: '/gateway/new_vet_at_home_services/:assist_request_vetcare_id?',
        name: 'new_vet_at_home_services',
        component: NewVetServices,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'new_services_vet_at_home')
    },

    {
        path: '/gateway/schedule_vet_at_home',
        name: 'schedule_vet_at_home',
        component: ScheduleVet,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_schedule_vet_at_home')
    },
    {
        path: '/gateway/referrals',
        name: 'referrals',
        component: Referrals,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_referrals_params')
    },
    {
        path: '/gateway/referrals_list',
        name: 'referrals_list',
        component: ReferralsList,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_referrals_list')
    },
    {
        path: '/gateway/favorite_products',
        name: 'favorite_products',
        component: FavoriteProducts,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_favorite_products')

    },
    {
        path: '/gateway/recomended_subcategories',
        name: 'recomended_subcategories',
        component: RecomendedSubcategories,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_recomended_subcategories')

    },
    {
        path: '/gateway/product_complete_purchase',
        name: 'product_complete_purchase',
        component: ProductCompletePurchase,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_product_complete_purchase')

    },
    {
        path: '/gateway/edit_product/:id',
        name: 'ProductsDetail',
        component: () =>
            import ('../components/Briefcase/Product/EditProduct.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_detail_product')
    },
    // {
    //     path: '/gateway/servicesv1',
    //     name: 'servicesV1',
    //     component: () =>
    //         import ('../components/SAC/ServicesV1/View.vue'),
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_v1')
    // },
    {
        path: '/gateway/block-user',
        name: 'block-users',
        component: () =>
            import ('../components/Users/components/BlockUser.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_blocked_users')
    },
    // {
    //     path: '/gateway/subscription-orders',
    //     name: 'subscription-orders',
    //     component: () =>
    //         import ('../components/SAC/SubscriptionOrders/View.vue'),
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_subscription_orders')
    // },
    // {
    //     path: '/gateway/history-subscription-orders',
    //     name: 'history-orders-subscriptions',
    //     component: () =>
    //         import ('../components/SAC/SubscriptionOrders/History.vue'),
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_history_orders')
    // },
    // {
    //     path: '/gateway/providers',
    //     name: 'providers',
    //     component: () =>
    //         import ('../components/SAC/ServicesV1/Providers.vue'),
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_provider_v1')
    // },
    {
        path: '/gateway/exclude_promotion',
        name: 'exclude_promotion',
        component: () =>
            import ('../components/Marketing/Excludes_Promotions/View.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_excludes_promotions')
    },

    {
        path: '/gateway/solicitudes',
        name: 'order-services-v1-solicitudes',
        component: () =>
            import ('../components/SAC/ServicesV1/Solicitudes/OrdersServicesV1Solicitudes.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_v1_solicitudes')
    },
    {
        path: '/gateway/solicitudes_detail/:id/',
        name: 'services-v1-solicitudes-detail',
        component: () =>
            import ('../components/SAC/ServicesV1/Solicitudes/OrdersServicesV1DetailSolicitudes.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_v1_solicitudes')
    },

    // {
    //     path: '/gateway/leads',
    //     name: 'order-services-v1-leads',
    //     component: () =>
    //         import ('../components/SAC/ServicesV1/Leads/OrdersServicesV1Lead.vue'),
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_v1_lead')
    // },
    // {
    //     path: '/gateway/leads_detail/:id/',
    //     name: 'services-v1-leads-detail',
    //     component: () =>
    //         import ('../components/SAC/ServicesV1/Leads/OrdersServicesV1DetailLead.vue'),
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_v1_lead')
    // },
    // {
    //     path: '/gateway/phone_order_refactor',
    //     name: 'phone_order_refactor',
    //     component: PhoneOrderRefactor,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'create_and_view_phone_order_refactor')

    // },
    {
        path: '/gateway/financial_domiciliary',
        name: 'financial_domiciliary',
        component: FinancialDomiciliary,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_financial_domiciliary')
    },
    {
        path: '/gateway/domiciliary/debt_detail/:id',
        name: 'debt_detail',
        component: DebtDetail,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_debt_detail_by_domiciliary')
    },
    {
        path: '/gateway/suppliers',
        name: 'suppliers',
        component: Supplier,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_suppliers')
    },

    {
        path: '/gateway/edit_supplier/:id',
        name: 'edit_supplier',
        component: SupplierEdit,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'edit_supplier')
    },
    {
        path: '/gateway/supplier/create',
        name: 'create_supplier',
        component: SupplierCreate,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'edit_supplier')
    },

    // {
    //     path: '/gateway/servicesv1',
    //     name: 'servicesV1',
    //     component: () =>
    //         import ('../components/SAC/ServicesV1/View.vue'),
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_v1')
    // },
    {
        path: '/gateway/block-user',
        name: 'block-users',
        component: () =>
            import ('../components/Users/components/BlockUser.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_blocked_users')
    },
    {
        path: '/gateway/subscription-orders',
        name: 'subscription-orders',
        component: () =>
            import ('../components/SAC/SubscriptionOrders/View.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_subscription_orders')
    },
    {
        path: '/gateway/history-subscription-orders',
        name: 'history-orders-subscriptions',
        component: () =>
            import ('../components/SAC/SubscriptionOrders/History.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_history_subscriptions')
    },
    {
        path: '/gateway/exclude_promotion',
        name: 'exclude_promotion',
        component: () =>
            import ('../components/Marketing/Excludes_Promotions/View.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_excludes_promotions')
    },

    {
        path: '/gateway/solicitudes_detail/:id/',
        name: 'services-v1-solicitudes-detail',
        component: () =>
            import ('../components/SAC/ServicesV1/Solicitudes/OrdersServicesV1DetailSolicitudes.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_v1_solicitudes')
    },

    {
        path: '/gateway/leads',
        name: 'order-services-v1-leads',
        component: () =>
            import ('../components/SAC/ServicesV1/Leads/OrdersServicesV1Lead.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_v1_lead')
    },
    {
        path: '/gateway/leads_detail/:id/',
        name: 'services-v1-leads-detail',
        component: () =>
            import ('../components/SAC/ServicesV1/Leads/OrdersServicesV1DetailLead.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_v1_lead')
    },
    {
        path: '/gateway/it/payments_gateway',
        name: 'payments_gateway',
        component: PaymentsGateway,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_payments_gateway_options')

    },
    {
        path: '/gateway/jobs',
        name: 'jobs',
        component: jobs,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_jobs')
    },
    {
        path: '/gateway/failed-jobs',
        name: 'failed_jobs',
        component: FailedJobs,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_failed_jobs')
    },
    {
        path: '/gateway/product_returns',
        name: 'product_returns',
        component: ProductReturns,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_product_returns')
    },
    {
        path: '/gateway/product_returns/:id',
        name: 'product_returns_detail',
        component: ProductReturnsDetail,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_product_return_detail')
    },
    {
        path: '/gateway/integracion-erp',
        name: 'ErpIntegration',
        component: ErpIntegration,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_integration_erp')
    },
    {
        path: '/gateway/migrations',
        name: 'Migrations',
        component: Migrations,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_migrations')
    },
    {
        path: '/gateway/user_profile',
        name: 'UserProfile',
        component: UserProfile,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'edit_user_profile')
    },
    {
        path: '/gateway/view_maps_order',
        name: 'ViewMapsOrder',
        component: ViewMapsOrder,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_map_orders')
    },
    {
        path: '/gateway/configuration_automatic_home_assignment',
        name: 'AutomaticAssignment',
        component: AutomaticAssignment,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'configuration_automatic_home_assignment')
    },
    {
        path: '/gateway/modules_documentation',
        name: 'ModulesDocumentation',
        component: ModulesDocumentation,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_modules_documentation')
    },
    //exportador de feeds google merchant
    {
        path: '/gateway/export_feeds_merchant',
        name: 'ExportFeed',
        component: ExportFeed,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_export_feed_merchant')
    },
    //Módulo de muestra gratis (producto)
    {
        path: '/gateway/free_sample',
        name: 'FreeSample',
        component: FreeSample,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_free_sample')
    },
    {
        path: "/gateway/create_order_return",
        name: "CreateOrderReturn",
        component: CreateOrderReturn,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'create_order_return')

    },
    {
        path: '/gateway/tracing-erp',
        name: 'TracingErp',
        component: TracingErp,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_integration_erp')
    },
    {
        path: '/gateway/free-deliveries',
        name: 'FreeDeliveries',
        component: FreeDeliveries,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_free_deliveries')
    },
    {
        path: '/gateway/plan-orders',
        name: 'PlanOrders',
        component: PlanOrders,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_order_vetcare')
    },
    {
        path: '/gateway/plan-ordersdetails/:id',
        name: 'PlanOrdersDetails',
        component: PlanOrdersDetails,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_order_vetcare')
    },
    {
        path: '/gateway/plan-assist',
        name: 'PlanAssist',
        component: PlanAssist,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_plan_assist')
    },
    {
        path: '/gateway/cards-assist',
        name: 'CardAssist',
        component: CardAssist,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_card_assist')
    },
    {
        path: '/gateway/refund-vetcare',
        name: 'RefundVetcare ',
        component: RefundVetcare,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_refund_vetcare')
    }, {
        path: '/gateway/plan-vetcare',
        name: 'PlanVetcare',
        component: PlanVetcare,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_plan_vetcare')
    },
    {
        path: '/gateway/refund_request_vetcare',
        name: 'refundRequestVetCare',
        component: RefundRequestVetCare,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_refund_request_vetcare')
    },
    {
        path: '/gateway/plan-assists_request',
        name: 'PlanAssistsRefund',
        component: PlanAssistsRefund,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_plan_vetcare')
    },
    // {
    //     path: '/gateway/picker-assignment',
    //     name: 'pickerAssignment',
    //     component: PickerAssignment,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_picker_assignment')
    // },
    {
        path: '/gateway/shopper',
        name: 'shopper',
        component: Shopper,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_shopper')
    },
    {
        path: '/gateway/receiver',
        name: 'receiver',
        component: Receiver,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_receiver')
    },
    // {
    //     path: '/gateway/picking_board',
    //     name: 'receiver',
    //     component: PickingBoard,
    //     beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_picking_board')
    // },
    {
        path: '/gateway/phone_order_vetcare',
        name: 'phoneOrderVetCare',
        component: PhoneOrderVetCare,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_phone_order_vetcare')
    },
    {
        path: '/gateway/refund-request-vetcare-details/:id',
        name: 'refundRequestVetCareDetails',
        component: RefundRequestVetCareDetails,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_phone_order_vetcare')
    },
    {
        path: '/gateway/assist-request-vetcare-details/:id',
        name: 'assistRequestVetCareDetails',
        component: AssistRequestVetCareDetails,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_assist_request_details')
    },
    {
        path: '/gateway/warehouse_sp',
        name: 'warehouse_sp',
        component: Warehouse_SP,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_orders_mw')
    },
    {
        path: '/gateway/category_banners',
        name: 'category_banners',
        component: CategoryBanners,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_category_banners')
    },

    {
        path: '/gateway/payments_domiciliary',
        name: 'payments_domiciliary',
        component: PaymentDomiciliary,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_payments_domiciliary')
    },
    {
        path: '/gateway/planner_sp',
        name: 'planner_sp',
        component: PlannerSP,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_planner_mw')
    },
    {
        path: '/gateway/beetrack',
        name: 'beetrack',
        component: Beetrack,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_planner_mw')
    },
    {
        path: '/gateway/picker-assignment_sp',
        name: 'picker-assignment_sp',
        component: PickerAssignmentSP,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_picker_assignment_mw')
    },
    {
        path: '/gateway/domiciliary_sp',
        name: 'domiciliary_sp',
        component: Domiciliary_SP,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_domiciliaries_mw')
    },
    {
        path: '/gateway/sync-stock',
        name: 'sync-stock',
        component: SyncStock,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'sync_stock_erp')
    },
    {
        path: '/gateway/phone_order_mw',
        name: 'phone_order_mw',
        component: PhoneOrderMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'create_and_view_phone_order_mw')

    },
    {
        path: '/gateway/order_detail_mw/:id',
        name: 'order_detail_mw',
        component: OrderDetailMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_order_detail')
    },
    {
        path: '/gateway/admin_warehouses_wms',
        name: 'admin_warehouses_wms',
        component: AdminWarehousesWMS,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_admin_warehouses_wms')
    },
    {
        path: '/gateway/admin_warehouses',
        name: 'admin_warehouses',
        component: AdminWarehouses,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_admin_warehouses')
    },
    {
        path: '/gateway/payment-methods',
        name: 'payment-methods',
        component: PaymentMethods,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_payment_methods')
    },
    {
        path: '/gateway/type_documents',
        name: 'type_document',
        component: TypeDocument,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_list_type_document')
    },
    {
        path: '/gateway/products_mw',
        name: 'products_mw',
        component: ProductsMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_products_mw')
    },
    {
        path: '/gateway/edit_product/:warehouse_id/:id',
        name: 'ProductsDetailMW',
        component: () =>
            import ('../components/Briefcase/Product/EditProductMW.vue'),
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_detail_products_mw')
    },
    {
        path: '/gateway/picking_mw',
        name: 'picking_mw',
        component: PickerMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_picker_mw')
    },
    {
        path: '/gateway/shopper_mw',
        name: 'shopper_mw',
        component: ShopperMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_shopper_mw')
    },
    {
        path: '/gateway/receiver_mw',
        name: 'receiver_mw',
        component: ReceiverMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_receiver_mw')
    },
    {
        path: '/gateway/picking_board_mw',
        name: 'picking_board_mw',
        component: PickingBoardMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_picking_board_mw')
    },
    {
        path: "/gateway/return_order_mw",
        name: "ReturnOrderMW",
        component: ReturnOrderMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'create_order_return_mw')
    },
    {
        path: '/gateway/pay_debt',
        name: 'pay_debt',
        component: PayDebt,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_list_pay_debt')
    },
    {
        path: '/gateway/packing',
        name: 'packing',
        component: Packing,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_packing_app')
    },
    {
        path: '/gateway/packing_board',
        name: 'packing_board',
        component: PackingBoard,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_packing_board')
    },
    {
        path: '/gateway/returns_products_mw',
        name: 'returns_products_mw',
        component: ReturnProductsMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_product_returns_mw')
    },
    {
        path: '/gateway/product_returns_mw/:id',
        name: 'returns_products_detail_mw',
        component: ProductReturnsDetailMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_product_return_detail_mw')
    },
    {
        path: '/gateway/services_v2',
        name: 'services_v2',
        component: ServicesV2,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'configuration_list_services_v1')
    },
    {
        path: '/gateway/providers_v2',
        name: 'providers_v2',
        component: ProvidersV2,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_provider_v1')
    },
    {
        path: '/gateway/info_order_service_v2',
        name: 'info_order_service_v2',
        component: InfoOrderService,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_services_v1_solicitudes')
    },
    {
        path: '/gateway/renewal_settings',
        name: 'renewal_settings',
        component: RenewalSettings,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_renewal_settings')
    },
    {
        path: '/gateway/inventary_compromised',
        name: 'inventary_compromised',
        component: InventaryCompromised,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_inventary_compromised')
    },
    {
        path: '/gateway/state_flow',
        name: 'state_flow',
        component: stateFlow,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_state_flow')
    },
    {
        path: '/gateway/synonyms',
        name: 'synonyms',
        component: Synonyms,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_synonyms')
    },
    {
        path: '/gateway/references',
        name: 'References',
        component: References,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_references')
    },
    {
        path: '/gateway/picker_assign_cedi',
        name: 'PickerAssignCedi',
        component: PickerAssignCedi,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_picker_assign_cedi')
    },
    {
        path: '/gateway/picking_cedi',
        name: 'PickingCedi',
        component: PickingCedi,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_picking_cedi')
    },
    {
        path: '/gateway/order_transfer',
        name: 'OrderTransfer',
        component: OrderTransfer,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_order_transfer')
    },
    {
        path: '/gateway/order_transfer/detail/:id',
        name: 'OrderTransferDetail',
        component: OrderTransferDetail,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_order_transfer')
    },
    {

        path: '/gateway/warehouse_mw',
        name: 'warehouse_mw',
        component: Warehouse_MW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_orders_mw')
    },
    {
        path: '/gateway/orders_mw',
        name: 'orders',
        component: OrderViewMW,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_orders')
    },
    {
        path: '/gateway/others',
        name: 'others',
        component: Others,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_others')
    },
    {
        path: '/gateway/universe_full_offers',
        name: 'universe_full_offers',
        component: UniverseFullOffers,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_universe_full_offers')

    },
    {
        path: '/gateway/terms_and_conditions',
        name: 'view_terms_and_conditions',
        component: TermsAndConditions,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_terms_and_conditions')
    },

    {
        path: '/gateway/global-images',
        name: 'global_images',
        component: GlobalImages,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'global_imagenes')
    },

]

const routes = baseRoutes.concat(
    MarketingRoutes,
    FinancialRoutes
)

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
})




///Middleware o gancho global router vue js
router.afterEach((to, from) => {
    if (!existToken()) {
        alert('Parece que no estás autenticado.') // Aquì podemos redireccionar al usuario si no existe un token.
    }
})


*/

//const routes = baseRoutes.concat()
/*
const router = new VueRouter({
  //  history: true,
    mode: 'history',
    routes:   {
        path: '/gateway/medic',
        name: 'medic',
        component: Medic,
        // beforeEnter: (to, from, next) => beforeEnter(to, from, next, 'view_membership_variables')
    },
})


 */

const routes = [
    {
        path: '/gateway/medic',
       // name: 'medic',
        component: Medic,
     //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }

];


const router = new VueRouter({
    routes
})
export default router;
