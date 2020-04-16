import React from "react";
import { Route, Switch, Redirect } from "react-router";

import { Analytics } from "./routes/Dashboards/Analytics/Analytics";
import { ProjectsDashboard } from "./routes/Dashboards/Projects/ProjectsDashboard";
import { System } from "./routes/Dashboards/System/System";
import { Monitor } from "./routes/Dashboards/Monitor/Monitor";
import { Financial } from "./routes/Dashboards/Financial/Financial";
import { Stock } from "./routes/Dashboards/Stock/Stock";
import { Reports } from "./routes/Dashboards/Reports/Reports";
import { DefaultNavbar } from "./layout/components/DefaultNavbar";
import { DefaultSidebar } from "./layout/components/DefaultSidebar";
import { Error404 } from "./routes/Pages/Error404/Error404";
import { SidebarANavbar } from "~/layout/components/SidebarANavbar";
import { NavbarOnly } from "./routes/Layouts/NavbarOnly/NavbarOnly";
import { SidebarWithNavbar } from "./routes/Layouts/SidebarWithNavbar/SidebarWithNavbar";
import { SidebarWithNavbarNavbar } from "~/layout/components/SidebarWithNavbarNavbar";
import { SidebarASidebar } from "~/layout/components/SidebarASidebar";
import { Widgets } from "./routes/Widgets/Widgets";
import { Cards } from "./routes/Cards/Cards/Cards";
import { CardsHeaders } from "./routes/Cards/CardsHeaders/CardsHeaders";
import { SidebarDefault } from "./routes/Layouts/SidebarDefault/SidebarDefault";
import { SidebarA } from "./routes/Layouts/SidebarA/SidebarA";
import { DragAndDropLayout } from "./routes/Layouts/DragAndDropLayout/DragAndDropLayout";
import { Accordions } from "./routes/Interface/Accordions/Accordions";
import { Alerts } from "./routes/Interface/Alerts/Alerts";
import { Avatars } from "./routes/Interface/Avatars/Avatars";
import { BadgesLabels } from "./routes/Interface/BadgesLabels/BadgesLabels";
import { Buttons } from "./routes/Interface/Buttons/Buttons";
import { Breadcrumbs } from "./routes/Interface/Breadcrumbs/Breadcrumbs";
import { Colors } from "./routes/Interface/Colors/Colors";
import { Dropdowns } from "./routes/Interface/Dropdowns/Dropdowns";
import { ListGroups } from "./routes/Interface/ListGroups/ListGroups";
import { Images } from "./routes/Interface/Images/Images";
import { MediaObjects } from "./routes/Interface/MediaObjects/MediaObjects";
import { Modals } from "./routes/Interface/Modals/Modals";
import { Navbars } from "./routes/Interface/Navbars/Navbars";
import { Paginations } from "./routes/Interface/Paginations/Paginations";
import { ProgressBars } from "./routes/Interface/ProgressBars/ProgressBars";
import { TabsPills } from "./routes/Interface/TabsPills/TabsPills";
import { TooltipsPopovers } from "./routes/Interface/TooltipsPopovers/TooltipsPopovers";
import { Typography } from "./routes/Interface/Typography/Typography";
import { Notifications } from "./routes/Interface/Notifications/Notifications";
import { CropImage } from "./routes/Interface/CropImage/CropImage";
import { DragAndDropElements } from "./routes/Interface/DragAndDropElements/DragAndDropElements";
import { Calendar } from "./routes/Interface/Calendar/Calendar";
import { Forms } from "./routes/Forms/Forms/Forms";
import { FormsLayouts } from "./routes/Forms/FormsLayouts/FormsLayouts";
import { InputGroups } from "./routes/Forms/InputGroups/InputGroups";
import { WizardExample } from "./routes/Forms/WizardExample/WizardExample";
import { TextMask } from "./routes/Forms/TextMask/TextMask";
import { Typeahead } from "./routes/Forms/Typeahead/Typeahead";
import { Toggles } from "./routes/Forms/Toggles/Toggles";
import { Editor } from "./routes/Forms/Editor/Editor";
import { DatePickerExamples } from "./routes/Forms/DatePicker/DatePickerExamples";
import { Dropzone } from "./routes/Forms/Dropzone/Dropzone";
import { Sliders } from "./routes/Forms/Sliders/Sliders";
import { ReCharts } from "./routes/Graphs/ReCharts";
import { Tables } from "./routes/Tables/Tables/Tables";
import { AgGridExample } from "./routes/Tables/AgGrid/AgGrid";
import { AccountEdit } from "./routes/Apps/AccountEdit/AccountEdit";
import { BillingEdit } from "./routes/Apps/BillingEdit/BillingEdit";
import { Clients } from "./routes/Apps/Clients/Clients";
import { EmailDetails } from "./routes/Apps/EmailDetails/EmailDetails";
import { Files } from "./routes/Apps/Files/Files";
import { GalleryGrid } from "./routes/Apps/GalleryGrid/GalleryGrid";
import { GalleryTable } from "./routes/Apps/GalleryTable/GalleryTable";
import { ImagesResults } from "./routes/Apps/ImagesResults/ImagesResults";
import { Inbox } from "./routes/Apps/Inbox/Inbox";
import { NewEmail } from "./routes/Apps/NewEmail/NewEmail";
import { ProfileDetails } from "./routes/Apps/ProfileDetails/ProfileDetails";
import { ProfileEdit } from "./routes/Apps/ProfileEdit/ProfileEdit";
import { Chat } from "./routes/Apps/Chat/Chat";
import { Projects } from "./routes/Apps/Projects/Projects";
import { SearchResults } from "./routes/Apps/SearchResults/SearchResults";
import { SettingsEdit } from "./routes/Apps/SettingsEdit/SettingsEdit";
import { Tasks } from "./routes/Apps/Tasks/Tasks";
import { TasksDetails } from "./routes/Apps/TasksDetails/TasksDetails";
import { TasksKanban } from "./routes/Apps/TasksKanban/TasksKanban";
import { Users } from "./routes/Apps/Users/Users";
import { UsersResults } from "./routes/Apps/UsersResults/UsersResults";
import { VideosResults } from "./routes/Apps/VideosResults/VideosResults";
import { SessionsEdit } from "./routes/Apps/SessionsEdit/SessionsEdit";
import { ComingSoon } from "./routes/Pages/ComingSoon/ComingSoon";
import { Confirmation } from "./routes/Pages/Confirmation/Confirmation";
import { Danger } from "./routes/Pages/Danger/Danger";
import { ForgotPassword } from "./routes/Pages/ForgotPassword/ForgotPassword";
import { LockScreen } from "./routes/Pages/LockScreen/LockScreen";
import { Login } from "./routes/Pages/Login/Login";
import { Register } from "./routes/Pages/Register/Register";
import { Success } from "./routes/Pages/Success/Success";
import { Timeline } from "./routes/Pages/Timeline/Timeline";
import { Icons } from "./routes/Icons/Icons";
import { LayoutNavbar } from "./routes/Layouts/NavbarOnly/components/LayoutNavbar";
import { ProtectedRoute } from "~/app/Auth/ProtectedRoute";
import { AuthScreen } from "~/app/Auth/AuthScreen";
import { LogoutRoute } from "~/app/Auth/LogoutRoute";

//------ Route Definitions --------
export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/dashboards/analytics" exact />

      <Route path="/login/:loginFrom" exact component={AuthScreen} />
      <LogoutRoute path="/logout/:loginFrom" exact />

      <ProtectedRoute
        path="/dashboards/analytics"
        exact
        component={Analytics}
      />

      {/* DEV ONLY */}

      <Route path="/dashboards/projects" exact component={ProjectsDashboard} />
      <Route path="/dashboards/system" exact component={System} />
      <Route path="/dashboards/monitor" exact component={Monitor} />
      <Route path="/dashboards/financial" exact component={Financial} />
      <Route path="/dashboards/stock" exact component={Stock} />
      <Route path="/dashboards/reports" exact component={Reports} />

      <Route path="/widgets" exact component={Widgets} />

      {/*    Cards Routes     */}
      <Route path="/cards/cards" exact component={Cards} />
      <Route path="/cards/cardsheaders" exact component={CardsHeaders} />

      {/*    Layouts     */}
      <Route path="/layouts/navbar" component={NavbarOnly} />
      <Route path="/layouts/sidebar" component={SidebarDefault} />
      <Route path="/layouts/sidebar-a" component={SidebarA} />
      <Route
        path="/layouts/sidebar-with-navbar"
        component={SidebarWithNavbar}
      />
      <Route path="/layouts/dnd-layout" component={DragAndDropLayout} />

      {/*    Interface Routes   */}
      <Route component={Accordions} path="/interface/accordions" />
      <Route component={Alerts} path="/interface/alerts" />
      <Route component={Avatars} path="/interface/avatars" />
      <Route component={BadgesLabels} path="/interface/badges-and-labels" />
      <Route component={Breadcrumbs} path="/interface/breadcrumbs" />
      <Route component={Buttons} path="/interface/buttons" />
      <Route component={Colors} path="/interface/colors" />
      <Route component={Dropdowns} path="/interface/dropdowns" />
      <Route component={Images} path="/interface/images" />
      <Route component={ListGroups} path="/interface/list-groups" />
      <Route component={MediaObjects} path="/interface/media-objects" />
      <Route component={Modals} path="/interface/modals" />
      <Route component={Navbars} path="/interface/navbars" />
      <Route component={Paginations} path="/interface/paginations" />
      <Route component={ProgressBars} path="/interface/progress-bars" />
      <Route component={TabsPills} path="/interface/tabs-pills" />
      <Route
        component={TooltipsPopovers}
        path="/interface/tooltips-and-popovers"
      />
      <Route component={Typography} path="/interface/typography" />
      <Route component={Notifications} path="/interface/notifications" />
      <Route component={CropImage} path="/interface/crop-image" />
      <Route
        component={DragAndDropElements}
        path="/interface/drag-and-drop-elements"
      />
      <Route component={Calendar} path="/interface/calendar" />

      {/*    Forms Routes    */}
      <Route component={Forms} path="/forms/forms" />
      <Route component={FormsLayouts} path="/forms/forms-layouts" />
      <Route component={InputGroups} path="/forms/input-groups" />
      <Route component={WizardExample} path="/forms/wizard" />
      <Route component={TextMask} path="/forms/text-mask" />
      <Route component={Typeahead} path="/forms/typeahead" />
      <Route component={Toggles} path="/forms/toggles" />
      <Route component={Editor} path="/forms/editor" />
      <Route component={DatePickerExamples} path="/forms/date-picker" />
      <Route component={Dropzone} path="/forms/dropzone" />
      <Route component={Sliders} path="/forms/sliders" />

      {/*    Graphs Routes   */}
      <Route component={ReCharts} path="/graphs/re-charts" />

      {/*    Tables Routes   */}
      <Route component={Tables} path="/tables/tables" />
      <Route component={AgGridExample} path="/tables/ag-grid" />

      {/*    Apps Routes     */}
      <Route component={AccountEdit} path="/apps/account-edit" />
      <Route component={BillingEdit} path="/apps/billing-edit" />
      <Route component={Chat} path="/apps/chat" />
      <Route component={Clients} path="/apps/clients" />
      <Route component={EmailDetails} path="/apps/email-details" />
      <Route component={Files} path="/apps/files/:type" />
      <Route component={GalleryGrid} path="/apps/gallery-grid" />
      <Route component={GalleryTable} path="/apps/gallery-table" />
      <Route component={ImagesResults} path="/apps/images-results" />
      <Route component={Inbox} path="/apps/inbox" />
      <Route component={NewEmail} path="/apps/new-email" />
      <Route component={ProfileDetails} path="/apps/profile-details" />
      <Route component={ProfileEdit} path="/apps/profile-edit" />
      <Route component={Projects} path="/apps/projects/:type" />
      <Route component={SearchResults} path="/apps/search-results" />
      <Route component={SessionsEdit} path="/apps/sessions-edit" />
      <Route component={SettingsEdit} path="/apps/settings-edit" />
      <Route component={Tasks} path="/apps/tasks/:type" />
      <Route component={TasksDetails} path="/apps/task-details" />
      <Route component={TasksKanban} path="/apps/tasks-kanban" />
      <Route component={Users} path="/apps/users/:type" />
      <Route component={UsersResults} path="/apps/users-results" />
      <Route component={VideosResults} path="/apps/videos-results" />

      {/*    Pages Routes    */}
      <Route component={ComingSoon} path="/pages/coming-soon" />
      <Route component={Confirmation} path="/pages/confirmation" />
      <Route component={Danger} path="/pages/danger" />
      <Route component={Error404} path="/pages/error-404" />
      <Route component={ForgotPassword} path="/pages/forgot-password" />
      <Route component={LockScreen} path="/pages/lock-screen" />
      <Route component={Login} path="/pages/login" />
      <Route component={Register} path="/pages/register" />
      <Route component={Success} path="/pages/success" />
      <Route component={Timeline} path="/pages/timeline" />

      <Route path="/icons" exact component={Icons} />

      {/*    404    */}
      <Route component={Error404} path="/pages/error-404" />
      {/* <Redirect to="/pages/error-404" /> */}
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
