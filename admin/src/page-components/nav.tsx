"use client"
import MainNav from "./header/main-nav";
import QuickActionsMenu from "./header/quick-actions-menu";
import TeamSwitcher from "./header/team-switcher";



const NavBar = () => {
    return (
        <nav className="border-y">
            <div className="p-2 py-4 flex items-center gap-4 md:gap-8 max-w-screen-xl mx-auto">
                <TeamSwitcher />
                <MainNav />
                <QuickActionsMenu className="ml-auto" />
            </div>
        </nav>
    );
}

export default NavBar;