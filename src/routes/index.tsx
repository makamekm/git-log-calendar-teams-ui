import React from "react";
import { Route, Switch, Redirect } from "react-router";

import { Analytics } from "./Dashboards/Analytics/Analytics";
import { ProjectsDashboard } from "./Dashboards/Projects/ProjectsDashboard";
import { System } from "./Dashboards/System/System";
import { Monitor } from "./Dashboards/Monitor/Monitor";
import { Financial } from "./Dashboards/Financial/Financial";
import { Stock } from "./Dashboards/Stock/Stock";
import { Reports } from "./Dashboards/Reports/Reports";
import { DefaultNavbar } from "../layout/components/DefaultNavbar";
import { DefaultSidebar } from "../layout/components/DefaultSidebar";
import { Error404 } from "./Pages/Error404/Error404";
import { SidebarANavbar } from "~/layout/components/SidebarANavbar";
import { NavbarOnly } from "./Layouts/NavbarOnly/NavbarOnly";
import { SidebarWithNavbar } from "./Layouts/SidebarWithNavbar/SidebarWithNavbar";
import { SidebarWithNavbarNavbar } from "~/layout/components/SidebarWithNavbarNavbar";
import { SidebarASidebar } from "~/layout/components/SidebarASidebar";
import { Widgets } from "./Widgets/Widgets";
import { Cards } from "./Cards/Cards/Cards";
import { CardsHeaders } from "./Cards/CardsHeaders/CardsHeaders";
import { SidebarDefault } from "./Layouts/SidebarDefault/SidebarDefault";
import { SidebarA } from "./Layouts/SidebarA/SidebarA";
import { DragAndDropLayout } from "./Layouts/DragAndDropLayout/DragAndDropLayout";
import { Accordions } from "./Interface/Accordions/Accordions";
import { Alerts } from "./Interface/Alerts/Alerts";
import { Avatars } from "./Interface/Avatars/Avatars";
import { BadgesLabels } from "./Interface/BadgesLabels/BadgesLabels";
import { Buttons } from "./Interface/Buttons/Buttons";
import { Breadcrumbs } from "./Interface/Breadcrumbs/Breadcrumbs";
import { Colors } from "./Interface/Colors/Colors";
import { Dropdowns } from "./Interface/Dropdowns/Dropdowns";
import { ListGroups } from "./Interface/ListGroups/ListGroups";
import { Images } from "./Interface/Images/Images";
import { MediaObjects } from "./Interface/MediaObjects/MediaObjects";
import { Modals } from "./Interface/Modals/Modals";
import { Navbars } from "./Interface/Navbars/Navbars";
import { Paginations } from "./Interface/Paginations/Paginations";
import { ProgressBars } from "./Interface/ProgressBars/ProgressBars";
import { TabsPills } from "./Interface/TabsPills/TabsPills";
import { TooltipsPopovers } from "./Interface/TooltipsPopovers/TooltipsPopovers";
import { Typography } from "./Interface/Typography/Typography";
import { Notifications } from "./Interface/Notifications/Notifications";
import { CropImage } from "./Interface/CropImage/CropImage";
import { DragAndDropElements } from "./Interface/DragAndDropElements/DragAndDropElements";
import { Calendar } from "./Interface/Calendar/Calendar";
import { Forms } from "./Forms/Forms/Forms";
import { FormsLayouts } from "./Forms/FormsLayouts/FormsLayouts";
import { InputGroups } from "./Forms/InputGroups/InputGroups";
import { WizardExample } from "./Forms/WizardExample/WizardExample";
import { TextMask } from "./Forms/TextMask/TextMask";
import { Typeahead } from "./Forms/Typeahead/Typeahead";
import { Toggles } from "./Forms/Toggles/Toggles";
import { Editor } from "./Forms/Editor/Editor";
import { DatePickerExamples } from "./Forms/DatePicker/DatePickerExamples";
import { Dropzone } from "./Forms/Dropzone/Dropzone";
import { Sliders } from "./Forms/Sliders/Sliders";
import { ReCharts } from "./Graphs/ReCharts";
import { Tables } from "./Tables/Tables/Tables";
import { AgGridExample } from "./Tables/AgGrid/AgGrid";
import { AccountEdit } from "./Apps/AccountEdit/AccountEdit";
import { BillingEdit } from "./Apps/BillingEdit/BillingEdit";
import { Clients } from "./Apps/Clients/Clients";
import { EmailDetails } from "./Apps/EmailDetails/EmailDetails";
import { Files } from "./Apps/Files/Files";
import { GalleryGrid } from "./Apps/GalleryGrid/GalleryGrid";
import { GalleryTable } from "./Apps/GalleryTable/GalleryTable";
import { ImagesResults } from "./Apps/ImagesResults/ImagesResults";
import { Inbox } from "./Apps/Inbox/Inbox";
import { NewEmail } from "./Apps/NewEmail/NewEmail";
import { ProfileDetails } from "./Apps/ProfileDetails/ProfileDetails";
import { ProfileEdit } from "./Apps/ProfileEdit/ProfileEdit";
import { Chat } from "./Apps/Chat/Chat";
import { Projects } from "./Apps/Projects/Projects";
import { SearchResults } from "./Apps/SearchResults/SearchResults";
import { SettingsEdit } from "./Apps/SettingsEdit/SettingsEdit";
import { Tasks } from "./Apps/Tasks/Tasks";
import { TasksDetails } from "./Apps/TasksDetails/TasksDetails";
import { TasksKanban } from "./Apps/TasksKanban/TasksKanban";
import { Users } from "./Apps/Users/Users";
import { UsersResults } from "./Apps/UsersResults/UsersResults";
import { VideosResults } from "./Apps/VideosResults/VideosResults";
import { SessionsEdit } from "./Apps/SessionsEdit/SessionsEdit";
import { ComingSoon } from "./Pages/ComingSoon/ComingSoon";
import { Confirmation } from "./Pages/Confirmation/Confirmation";
import { Danger } from "./Pages/Danger/Danger";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import { LockScreen } from "./Pages/LockScreen/LockScreen";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { Success } from "./Pages/Success/Success";
import { Timeline } from "./Pages/Timeline/Timeline";
import { Icons } from "./Icons/Icons";
import { LayoutNavbar } from "./Layouts/NavbarOnly/components/LayoutNavbar";
import { ProtectedRoute } from "~/app/Auth/ProtectedRoute";
import { AuthScreen } from "~/app/Auth/AuthScreen";

//------ Route Definitions --------
export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/dashboards/analytics" exact />

      <Route path="/login/:loginFrom" exact component={AuthScreen} />

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
      <Redirect to="/pages/error-404" />
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
