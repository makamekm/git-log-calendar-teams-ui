import React from "react";
import { SidebarMenu, SidebarMenuItem } from "~/components";
import { observer } from "mobx-react";
import { ChatService } from "~/app/ChatService";

export const SidebarMiddleNav = observer(() => {
  const chatService = React.useContext(ChatService);
  return (
    <SidebarMenu>
      <SidebarMenuItem
        icon={<i className="fa fa-th"></i>}
        title="Dashboard"
        to="/dashboard"
      />

      {chatService.isActive ? (
        <SidebarMenuItem
          icon={<i className="fa fa-comments"></i>}
          title="Chat"
          to="/chat"
          exact
        />
      ) : (
        <></>
      )}

      <SidebarMenuItem
        icon={<i className="fa fa-cog"></i>}
        title="Configuration"
        to="/configuration"
      />

      <SidebarMenuItem
        icon={<i className="fas fa-cogs"></i>}
        title="Settings"
        to="/settings"
      />

      <SidebarMenuItem
        icon={<i className="fas fa-file"></i>}
        title="Logs"
        to="/logs"
      />

      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-home"></i>}
        title="Dashboards"
      >
        <SidebarMenuItem title="Analytics" to="/dashboards/analytics" exact />
        <SidebarMenuItem title="Projects" to="/dashboards/projects" exact />
        <SidebarMenuItem title="System" to="/dashboards/system" exact />
        <SidebarMenuItem title="Monitor" to="/dashboards/monitor" exact />
        <SidebarMenuItem title="Financial" to="/dashboards/financial" exact />
        <SidebarMenuItem title="Stock" to="/dashboards/stock" exact />
        <SidebarMenuItem title="Reports" to="/dashboards/reports" exact />
      </SidebarMenuItem>
      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-th"></i>}
        title="Widgets"
        to="/widgets"
      />
      {/* -------- Cards ---------*/}
      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-clone"></i>}
        title="Cards"
      >
        <SidebarMenuItem title="Cards" to="/cards/cards" exact />
        <SidebarMenuItem title="Cards Headers" to="/cards/cardsheaders" exact />
      </SidebarMenuItem>
      {/* -------- Layouts ---------*/}
      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-columns"></i>}
        title="Layouts"
      >
        <SidebarMenuItem title="Navbar" to="/layouts/navbar" exact />
        <SidebarMenuItem title="Sidebar" to="/layouts/sidebar" exact />
        <SidebarMenuItem title="Sidebar A" to="/layouts/sidebar-a" exact />
        <SidebarMenuItem
          title="Sidebar With Navbar"
          to="/layouts/sidebar-with-navbar"
          exact
        />
        <SidebarMenuItem
          title="Drag &amp; Drop"
          to="/layouts/dnd-layout"
          exact
        />
      </SidebarMenuItem>
      {/* -------- Interface ---------*/}
      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-toggle-on"></i>}
        title="Interface"
      >
        <SidebarMenuItem title="Colors" to="/interface/colors" />
        <SidebarMenuItem title="Typography" to="/interface/typography" />
        <SidebarMenuItem title="Buttons" to="/interface/buttons" />
        <SidebarMenuItem title="Paginations" to="/interface/paginations" />
        <SidebarMenuItem title="Images" to="/interface/images" />
        <SidebarMenuItem title="Avatars" to="/interface/avatars" />
        <SidebarMenuItem title="Progress Bars" to="/interface/progress-bars" />
        <SidebarMenuItem
          title="Badges &amp; Labels"
          to="/interface/badges-and-labels"
        />
        <SidebarMenuItem title="Media Objects" to="/interface/media-objects" />
        <SidebarMenuItem title="List Groups" to="/interface/list-groups" />
        <SidebarMenuItem title="Alerts" to="/interface/alerts" />
        <SidebarMenuItem title="Accordions" to="/interface/accordions" />
        <SidebarMenuItem title="Tabs Pills" to="/interface/tabs-pills" />
        <SidebarMenuItem
          title="Tooltips &amp; Popovers"
          to="/interface/tooltips-and-popovers"
        />
        <SidebarMenuItem title="Dropdowns" to="/interface/dropdowns" />
        <SidebarMenuItem title="Modals" to="/interface/modals" />
        <SidebarMenuItem title="Breadcrumbs" to="/interface/breadcrumbs" />
        <SidebarMenuItem title="Navbars" to="/interface/navbars" />
        <SidebarMenuItem title="Notifications" to="/interface/notifications" />
        <SidebarMenuItem title="Crop Image" to="/interface/crop-image" />
        <SidebarMenuItem
          title="Drag &amp; Drop Elements"
          to="/interface/drag-and-drop-elements"
        />
        <SidebarMenuItem title="Calendar" to="/interface/calendar" />
      </SidebarMenuItem>
      {/* -------- Graphs ---------*/}
      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-pie-chart"></i>}
        title="Graphs"
      >
        <SidebarMenuItem title="ReCharts" to="/graphs/re-charts" />
      </SidebarMenuItem>
      {/* -------- Forms ---------*/}
      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-check-square-o"></i>}
        title="Forms"
      >
        <SidebarMenuItem title="Forms" to="/forms/forms" />
        <SidebarMenuItem title="Forms Layouts" to="/forms/forms-layouts" />
        <SidebarMenuItem title="Input Groups" to="/forms/input-groups" />
        <SidebarMenuItem title="Wizard" to="/forms/wizard" />
        <SidebarMenuItem title="Text Mask" to="/forms/text-mask" />
        <SidebarMenuItem title="Typeahead" to="/forms/typeahead" />
        <SidebarMenuItem title="Toggles" to="/forms/toggles" />
        <SidebarMenuItem title="Editor" to="/forms/editor" />
        <SidebarMenuItem title="Date Picker" to="/forms/date-picker" />
        <SidebarMenuItem title="Dropzone" to="/forms/dropzone" />
        <SidebarMenuItem title="Sliders" to="/forms/sliders" />
      </SidebarMenuItem>
      {/* -------- Tables ---------*/}
      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-trello"></i>}
        title="Tables"
      >
        <SidebarMenuItem title="Tables" to="/tables/tables" />
        <SidebarMenuItem title="AgGrid" to="/tables/ag-grid" />
      </SidebarMenuItem>
      {/* -------- Apps ---------*/}
      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-mouse-pointer"></i>}
        title="Apps"
      >
        <SidebarMenuItem title="Projects">
          <SidebarMenuItem title="Projects List" to="/apps/projects/list" />
          <SidebarMenuItem title="Projects Grid" to="/apps/projects/grid" />
        </SidebarMenuItem>
        <SidebarMenuItem title="Tasks">
          <SidebarMenuItem title="Tasks List" to="/apps/tasks/list" />
          <SidebarMenuItem title="Tasks Grid" to="/apps/tasks/grid" />
          <SidebarMenuItem title="Tasks Kanban" to="/apps/tasks-kanban" />
          <SidebarMenuItem title="Tasks Details" to="/apps/task-details" />
        </SidebarMenuItem>
        <SidebarMenuItem title="Files">
          <SidebarMenuItem title="Files List" to="/apps/files/list" />
          <SidebarMenuItem title="Files Grid" to="/apps/files/grid" />
        </SidebarMenuItem>
        <SidebarMenuItem title="Search Results">
          <SidebarMenuItem title="Search Results" to="/apps/search-results" />
          <SidebarMenuItem title="Images Results" to="/apps/images-results" />
          <SidebarMenuItem title="Videos Results" to="/apps/videos-results" />
          <SidebarMenuItem title="Users Results" to="/apps/users-results" />
        </SidebarMenuItem>
        <SidebarMenuItem title="Users">
          <SidebarMenuItem title="Users List" to="/apps/users/list" />
          <SidebarMenuItem title="Users Grid" to="/apps/users/grid" />
        </SidebarMenuItem>
        <SidebarMenuItem title="Gallery">
          <SidebarMenuItem title="Gallery Grid" to="/apps/gallery-grid" />
          <SidebarMenuItem title="Gallery Table" to="/apps/gallery-table" />
        </SidebarMenuItem>
        <SidebarMenuItem title="Mailbox">
          <SidebarMenuItem title="Inbox" to="/apps/inbox" />
          <SidebarMenuItem title="New Email" to="/apps/new-email" />
          <SidebarMenuItem title="Email Details" to="/apps/email-details" />
        </SidebarMenuItem>
        <SidebarMenuItem title="Profile">
          <SidebarMenuItem title="Profile Details" to="/apps/profile-details" />
          <SidebarMenuItem title="Profile Edit" to="/apps/profile-edit" />
          <SidebarMenuItem title="Account Edit" to="/apps/account-edit" />
          <SidebarMenuItem title="Billing Edit" to="/apps/billing-edit" />
          <SidebarMenuItem title="Settings Edit" to="/apps/settings-edit" />
          <SidebarMenuItem title="Sessions Edit" to="/apps/sessions-edit" />
        </SidebarMenuItem>
        <SidebarMenuItem title="Clients" to="/apps/clients" exact />
        <SidebarMenuItem title="Chat" to="/apps/chat" exact />
      </SidebarMenuItem>
      {/* -------- Pages ---------*/}
      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-copy"></i>}
        title="Pages"
      >
        <SidebarMenuItem title="Register" to="/pages/register" />
        <SidebarMenuItem title="Login" to="/pages/login" />
        <SidebarMenuItem title="Forgot Password" to="/pages/forgot-password" />
        <SidebarMenuItem title="Lock Screen" to="/pages/lock-screen" />
        <SidebarMenuItem title="Error 404" to="/pages/error-404" />
        <SidebarMenuItem title="Confirmation" to="/pages/confirmation" />
        <SidebarMenuItem title="Success" to="/pages/success" />
        <SidebarMenuItem title="Danger" to="/pages/danger" />
        <SidebarMenuItem title="Coming Soon" to="/pages/coming-soon" />
        <SidebarMenuItem title="Timeline" to="/pages/timeline" />
      </SidebarMenuItem>
      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-star-o"></i>}
        title="Icons"
        to="/icons"
      />

      <SidebarMenuItem
        isWIP
        icon={<i className="fa fa-fw fa-book"></i>}
        title="Docs"
        href="https://getbootstrap.com/docs/4.0"
      />
    </SidebarMenu>
  );
});
