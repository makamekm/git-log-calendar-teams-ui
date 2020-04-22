import React from "react";
import { Route, Switch, Redirect } from "react-router";

import { Analytics } from "./wip/Dashboards/Analytics/Analytics";
import { ProjectsDashboard } from "./wip/Dashboards/Projects/ProjectsDashboard";
import { System } from "./wip/Dashboards/System/System";
import { Monitor } from "./wip/Dashboards/Monitor/Monitor";
import { Financial } from "./wip/Dashboards/Financial/Financial";
import { Stock } from "./wip/Dashboards/Stock/Stock";
import { Reports } from "./wip/Dashboards/Reports/Reports";
import { NavbarOnly } from "./wip/Layouts/NavbarOnly/NavbarOnly";
import { SidebarWithNavbar } from "./wip/Layouts/SidebarWithNavbar/SidebarWithNavbar";
import { Widgets } from "./wip/Widgets/Widgets";
import { Cards } from "./wip/Cards/Cards/Cards";
import { CardsHeaders } from "./wip/Cards/CardsHeaders/CardsHeaders";
import { SidebarDefault } from "./wip/Layouts/SidebarDefault/SidebarDefault";
import { SidebarA } from "./wip/Layouts/SidebarA/SidebarA";
import { DragAndDropLayout } from "./wip/Layouts/DragAndDropLayout/DragAndDropLayout";
import { Accordions } from "./wip/Interface/Accordions/Accordions";
import { Alerts } from "./wip/Interface/Alerts/Alerts";
import { Avatars } from "./wip/Interface/Avatars/Avatars";
import { BadgesLabels } from "./wip/Interface/BadgesLabels/BadgesLabels";
import { Buttons } from "./wip/Interface/Buttons/Buttons";
import { Breadcrumbs } from "./wip/Interface/Breadcrumbs/Breadcrumbs";
import { Colors } from "./wip/Interface/Colors/Colors";
import { Dropdowns } from "./wip/Interface/Dropdowns/Dropdowns";
import { ListGroups } from "./wip/Interface/ListGroups/ListGroups";
import { Images } from "./wip/Interface/Images/Images";
import { MediaObjects } from "./wip/Interface/MediaObjects/MediaObjects";
import { Modals } from "./wip/Interface/Modals/Modals";
import { Navbars } from "./wip/Interface/Navbars/Navbars";
import { Paginations } from "./wip/Interface/Paginations/Paginations";
import { ProgressBars } from "./wip/Interface/ProgressBars/ProgressBars";
import { TabsPills } from "./wip/Interface/TabsPills/TabsPills";
import { TooltipsPopovers } from "./wip/Interface/TooltipsPopovers/TooltipsPopovers";
import { Typography } from "./wip/Interface/Typography/Typography";
import { Notifications } from "./wip/Interface/Notifications/Notifications";
import { CropImage } from "./wip/Interface/CropImage/CropImage";
import { DragAndDropElements } from "./wip/Interface/DragAndDropElements/DragAndDropElements";
import { Calendar } from "./wip/Interface/Calendar/Calendar";
import { Forms } from "./wip/Forms/Forms/Forms";
import { FormsLayouts } from "./wip/Forms/FormsLayouts/FormsLayouts";
import { InputGroups } from "./wip/Forms/InputGroups/InputGroups";
import { WizardExample } from "./wip/Forms/WizardExample/WizardExample";
import { TextMask } from "./wip/Forms/TextMask/TextMask";
import { Typeahead } from "./wip/Forms/Typeahead/Typeahead";
import { Toggles } from "./wip/Forms/Toggles/Toggles";
import { Editor } from "./wip/Forms/Editor/Editor";
import { DatePickerExamples } from "./wip/Forms/DatePicker/DatePickerExamples";
import { Dropzone } from "./wip/Forms/Dropzone/Dropzone";
import { Sliders } from "./wip/Forms/Sliders/Sliders";
import { ReCharts } from "./wip/Graphs/ReCharts";
import { Tables } from "./wip/Tables/Tables/Tables";
import { AgGridExample } from "./wip/Tables/AgGrid/AgGrid";
import { AccountEdit } from "./wip/Apps/AccountEdit/AccountEdit";
import { BillingEdit } from "./wip/Apps/BillingEdit/BillingEdit";
import { Clients } from "./wip/Apps/Clients/Clients";
import { EmailDetails } from "./wip/Apps/EmailDetails/EmailDetails";
import { Files } from "./wip/Apps/Files/Files";
import { GalleryGrid } from "./wip/Apps/GalleryGrid/GalleryGrid";
import { GalleryTable } from "./wip/Apps/GalleryTable/GalleryTable";
import { ImagesResults } from "./wip/Apps/ImagesResults/ImagesResults";
import { Inbox } from "./wip/Apps/Inbox/Inbox";
import { NewEmail } from "./wip/Apps/NewEmail/NewEmail";
import { ProfileDetails } from "./wip/Apps/ProfileDetails/ProfileDetails";
import { ProfileEdit } from "./wip/Apps/ProfileEdit/ProfileEdit";
import { Chat } from "./wip/Apps/Chat/Chat";
import { Projects } from "./wip/Apps/Projects/Projects";
import { SearchResults } from "./wip/Apps/SearchResults/SearchResults";
import { SettingsEdit } from "./wip/Apps/SettingsEdit/SettingsEdit";
import { Tasks } from "./wip/Apps/Tasks/Tasks";
import { TasksDetails } from "./wip/Apps/TasksDetails/TasksDetails";
import { TasksKanban } from "./wip/Apps/TasksKanban/TasksKanban";
import { Users } from "./wip/Apps/Users/Users";
import { UsersResults } from "./wip/Apps/UsersResults/UsersResults";
import { VideosResults } from "./wip/Apps/VideosResults/VideosResults";
import { SessionsEdit } from "./wip/Apps/SessionsEdit/SessionsEdit";
import { ComingSoon } from "./wip/Pages/ComingSoon/ComingSoon";
import { Confirmation } from "./wip/Pages/Confirmation/Confirmation";
import { Danger } from "./wip/Pages/Danger/Danger";
import { ForgotPassword } from "./wip/Pages/ForgotPassword/ForgotPassword";
import { LockScreen } from "./wip/Pages/LockScreen/LockScreen";
import { Login } from "./wip/Pages/Login/Login";
import { Register } from "./wip/Pages/Register/Register";
import { Success } from "./wip/Pages/Success/Success";
import { Timeline } from "./wip/Pages/Timeline/Timeline";
import { Icons } from "./wip/Icons/Icons";
import { LayoutNavbar } from "./wip/Layouts/NavbarOnly/components/LayoutNavbar";

import { SidebarWithNavbarNavbar } from "./layout/SidebarWithNavbarNavbar";
import { DefaultNavbar } from "./layout/DefaultNavbar";
import { DefaultSidebar } from "./layout/DefaultSidebar";
import { SidebarANavbar } from "./layout/SidebarANavbar";
import { SidebarASidebar } from "./layout/SidebarASidebar";

import { ProtectedRoute } from "./app/Auth/ProtectedRoute";
import { AuthScreen } from "./app/Auth/AuthScreen";
import { LogoutRoute } from "./app/Auth/LogoutRoute";
import { Dashboard } from "./app/Dashboard/Dashboard";
import { Error404 } from "./app/Error404";
import { Settings } from "./app/Settings/Settings";
import { LogsScreen } from "./app/Log/LogsScreen";
import { TeamDashboard } from "./app/Details/TeamDashboard";
import { UserDashboard } from "./app/Details/UserDashboard";
import { RepositoryDashboard } from "./app/Details/RepositoryDashboard";

//------ Route Definitions --------
export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/dashboard" exact />
      <Redirect from="/index.html" to="/dashboard" exact />

      <Route path="/login/:loginFrom" exact component={AuthScreen} />
      <LogoutRoute path="/logout/:loginFrom" exact />

      <Route component={Error404} path="/404" />

      <ProtectedRoute path="/dashboard" exact component={Dashboard} />
      <ProtectedRoute path="/team/:teamName" exact component={TeamDashboard} />
      <ProtectedRoute path="/user/:userName" exact component={UserDashboard} />
      <ProtectedRoute
        path="/repository/:repositoryName"
        exact
        component={RepositoryDashboard}
      />

      <ProtectedRoute path="/settings" exact component={Settings} />
      <Route path="/logs" exact component={LogsScreen} />

      {/* WIP */}

      <ProtectedRoute
        path="/dashboards/analytics"
        exact
        component={Analytics}
      />

      <ProtectedRoute
        isWIP
        path="/dashboards/projects"
        exact
        component={ProjectsDashboard}
      />
      <ProtectedRoute
        isWIP
        path="/dashboards/system"
        exact
        component={System}
      />
      <ProtectedRoute
        isWIP
        path="/dashboards/monitor"
        exact
        component={Monitor}
      />
      <ProtectedRoute
        isWIP
        path="/dashboards/financial"
        exact
        component={Financial}
      />
      <ProtectedRoute isWIP path="/dashboards/stock" exact component={Stock} />
      <ProtectedRoute
        isWIP
        path="/dashboards/reports"
        exact
        component={Reports}
      />

      <ProtectedRoute isWIP path="/widgets" exact component={Widgets} />

      {/*    Cards Routes     */}
      <ProtectedRoute isWIP path="/cards/cards" exact component={Cards} />
      <ProtectedRoute
        isWIP
        path="/cards/cardsheaders"
        exact
        component={CardsHeaders}
      />

      {/*    Layouts     */}
      <ProtectedRoute isWIP path="/layouts/navbar" component={NavbarOnly} />
      <ProtectedRoute
        isWIP
        path="/layouts/sidebar"
        component={SidebarDefault}
      />
      <ProtectedRoute isWIP path="/layouts/sidebar-a" component={SidebarA} />
      <ProtectedRoute
        isWIP
        path="/layouts/sidebar-with-navbar"
        component={SidebarWithNavbar}
      />
      <ProtectedRoute
        isWIP
        path="/layouts/dnd-layout"
        component={DragAndDropLayout}
      />

      {/*    Interface Routes   */}
      <ProtectedRoute
        isWIP
        component={Accordions}
        path="/interface/accordions"
      />
      <ProtectedRoute isWIP component={Alerts} path="/interface/alerts" />
      <ProtectedRoute isWIP component={Avatars} path="/interface/avatars" />
      <ProtectedRoute
        isWIP
        component={BadgesLabels}
        path="/interface/badges-and-labels"
      />
      <ProtectedRoute
        isWIP
        component={Breadcrumbs}
        path="/interface/breadcrumbs"
      />
      <ProtectedRoute isWIP component={Buttons} path="/interface/buttons" />
      <ProtectedRoute isWIP component={Colors} path="/interface/colors" />
      <ProtectedRoute isWIP component={Dropdowns} path="/interface/dropdowns" />
      <ProtectedRoute isWIP component={Images} path="/interface/images" />
      <ProtectedRoute
        isWIP
        component={ListGroups}
        path="/interface/list-groups"
      />
      <ProtectedRoute
        isWIP
        component={MediaObjects}
        path="/interface/media-objects"
      />
      <ProtectedRoute isWIP component={Modals} path="/interface/modals" />
      <ProtectedRoute isWIP component={Navbars} path="/interface/navbars" />
      <ProtectedRoute
        isWIP
        component={Paginations}
        path="/interface/paginations"
      />
      <ProtectedRoute
        isWIP
        component={ProgressBars}
        path="/interface/progress-bars"
      />
      <ProtectedRoute
        isWIP
        component={TabsPills}
        path="/interface/tabs-pills"
      />
      <ProtectedRoute
        isWIP
        component={TooltipsPopovers}
        path="/interface/tooltips-and-popovers"
      />
      <ProtectedRoute
        isWIP
        component={Typography}
        path="/interface/typography"
      />
      <ProtectedRoute
        isWIP
        component={Notifications}
        path="/interface/notifications"
      />
      <ProtectedRoute
        isWIP
        component={CropImage}
        path="/interface/crop-image"
      />
      <ProtectedRoute
        isWIP
        component={DragAndDropElements}
        path="/interface/drag-and-drop-elements"
      />
      <ProtectedRoute isWIP component={Calendar} path="/interface/calendar" />

      {/*    Forms Routes    */}
      <ProtectedRoute isWIP component={Forms} path="/forms/forms" />
      <ProtectedRoute
        isWIP
        component={FormsLayouts}
        path="/forms/forms-layouts"
      />
      <ProtectedRoute
        isWIP
        component={InputGroups}
        path="/forms/input-groups"
      />
      <ProtectedRoute isWIP component={WizardExample} path="/forms/wizard" />
      <ProtectedRoute isWIP component={TextMask} path="/forms/text-mask" />
      <ProtectedRoute isWIP component={Typeahead} path="/forms/typeahead" />
      <ProtectedRoute isWIP component={Toggles} path="/forms/toggles" />
      <ProtectedRoute isWIP component={Editor} path="/forms/editor" />
      <ProtectedRoute
        isWIP
        component={DatePickerExamples}
        path="/forms/date-picker"
      />
      <ProtectedRoute isWIP component={Dropzone} path="/forms/dropzone" />
      <ProtectedRoute isWIP component={Sliders} path="/forms/sliders" />

      {/*    Graphs Routes   */}
      <ProtectedRoute isWIP component={ReCharts} path="/graphs/re-charts" />

      {/*    Tables Routes   */}
      <ProtectedRoute isWIP component={Tables} path="/tables/tables" />
      <ProtectedRoute isWIP component={AgGridExample} path="/tables/ag-grid" />

      {/*    Apps Routes     */}
      <ProtectedRoute isWIP component={AccountEdit} path="/apps/account-edit" />
      <ProtectedRoute isWIP component={BillingEdit} path="/apps/billing-edit" />
      <ProtectedRoute isWIP component={Chat} path="/apps/chat" />
      <ProtectedRoute isWIP component={Clients} path="/apps/clients" />
      <ProtectedRoute
        isWIP
        component={EmailDetails}
        path="/apps/email-details"
      />
      <ProtectedRoute isWIP component={Files} path="/apps/files/:type" />
      <ProtectedRoute isWIP component={GalleryGrid} path="/apps/gallery-grid" />
      <ProtectedRoute
        isWIP
        component={GalleryTable}
        path="/apps/gallery-table"
      />
      <ProtectedRoute
        isWIP
        component={ImagesResults}
        path="/apps/images-results"
      />
      <ProtectedRoute isWIP component={Inbox} path="/apps/inbox" />
      <ProtectedRoute isWIP component={NewEmail} path="/apps/new-email" />
      <ProtectedRoute
        isWIP
        component={ProfileDetails}
        path="/apps/profile-details"
      />
      <ProtectedRoute isWIP component={ProfileEdit} path="/apps/profile-edit" />
      <ProtectedRoute isWIP component={Projects} path="/apps/projects/:type" />
      <ProtectedRoute
        isWIP
        component={SearchResults}
        path="/apps/search-results"
      />
      <ProtectedRoute
        isWIP
        component={SessionsEdit}
        path="/apps/sessions-edit"
      />
      <ProtectedRoute
        isWIP
        component={SettingsEdit}
        path="/apps/settings-edit"
      />
      <ProtectedRoute isWIP component={Tasks} path="/apps/tasks/:type" />
      <ProtectedRoute
        isWIP
        component={TasksDetails}
        path="/apps/task-details"
      />
      <ProtectedRoute isWIP component={TasksKanban} path="/apps/tasks-kanban" />
      <ProtectedRoute isWIP component={Users} path="/apps/users/:type" />
      <ProtectedRoute
        isWIP
        component={UsersResults}
        path="/apps/users-results"
      />
      <ProtectedRoute
        isWIP
        component={VideosResults}
        path="/apps/videos-results"
      />

      {/*    Pages Routes    */}
      <ProtectedRoute isWIP component={ComingSoon} path="/pages/coming-soon" />
      <ProtectedRoute
        isWIP
        component={Confirmation}
        path="/pages/confirmation"
      />
      <ProtectedRoute isWIP component={Danger} path="/pages/danger" />
      <ProtectedRoute
        isWIP
        component={ForgotPassword}
        path="/pages/forgot-password"
      />
      <ProtectedRoute isWIP component={LockScreen} path="/pages/lock-screen" />
      <ProtectedRoute isWIP component={Login} path="/pages/login" />
      <ProtectedRoute isWIP component={Register} path="/pages/register" />
      <ProtectedRoute isWIP component={Success} path="/pages/success" />
      <ProtectedRoute isWIP component={Timeline} path="/pages/timeline" />

      <ProtectedRoute isWIP path="/icons" exact component={Icons} />

      {/*    404    */}
      <Route component={Error404} />
      {/* <Redirect to="/404" /> */}
    </Switch>
  );
};

//------ Custom Layout Parts --------
export const RoutedNavbars = () => (
  <Switch>
    {/* Other Navbars: */}
    <Route component={SidebarANavbar} path="/layouts/sidebar-a" />
    <Route component={LayoutNavbar} path="/layouts/navbar" />
    <Route
      component={SidebarWithNavbarNavbar}
      path="/layouts/sidebar-with-navbar"
    />

    {/* Default Navbar: */}
    <Route component={DefaultNavbar} />
  </Switch>
);

export const RoutedSidebars = () => (
  <Switch>
    {/* Other Sidebars: */}
    <Route component={SidebarASidebar} path="/layouts/sidebar-a" />
    <Route component={DefaultSidebar} path="/layouts/sidebar-with-navbar" />

    {/* Default Sidebar: */}
    <Route component={DefaultSidebar} />
  </Switch>
);
