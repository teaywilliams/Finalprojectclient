import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { Admin } from '../components/admin/Admin';
import UserEdit from "../components/user/UserEdit";
import User from "../components/user/User";
import SubscriptionCreate from "../components/subscription/SubscriptionCreate";
import SubscriptionTable from "../components/subscription/SubscriptionTable";
import SubscriptionEdit from "../components/subscription/SubscriptionEdit";
import AdminSubscriptionTblDel from "../components/subscription/AdminSubscriptionTblDel";
import AdminSubscriptionMgmt from "../components/subscription/AdminSubscriptionMgmt";
import AdminSubscriptionEdit from "../components/subscription/AdminSubscriptionEdit";
import ProfileCreate from "../components/Profile/ProfileCreate";
import ProfileTable from "../components/Profile/ProfileTable";
import AdminProfileTblDel from "../components/Profile/AdminProfileTblDel";
import AdminProfileEdit from "../components/Profile/AdminProfileEdit";
import ProfileEdit from "../components/Profile/ProfileEdit";
import AdminProfileMgmt from "../components/Profile/AdminProfileMgmt";
import Auth from "../auth/Auth";
import Home from "./Home";


type ControllerProps = {
    updateSessionToken: (newToken: string) => void;
    updateUserRole: (newUserRole: string) => void;
    updateEmail: (newEmail: string) => void;
    protectedViews: () => void;
    clearUser: () => void;
    updateProfileId: (newProfileId: number) => void;
    updateSubscriptionId: (newSubscriptionId: number) => void;
    updateUserId: (newUserId: number) => void;
    sessionToken: any;
    email: string | null | undefined;
    userRole: string;
    profileId: number;
    subscriptionId: number;
    userId: number;
};

const SwitchController: FC<ControllerProps> = (props) => {
    console.log("switchController: ", props.sessionToken);

    return (
        <div className="ViewsDiv">
            <div className="routes">
                <Switch>
                    <Route exact path="/home"/>
                    <Route  path="/auth">
                        <Auth
                            updateSessionToken={props.updateSessionToken}
                            updateUserRole={props.updateUserRole}
                        />
                    </Route>
                    <Route exact path="/user/edit">
                        <UserEdit
                            sessionToken={props.sessionToken}
                            clearUser={props.clearUser}
                        />
                    </Route>
                    <Route exact path="/user/home">
                        <User />
                    </Route>
                    <Route path="/subscription/signup">
                        <SubscriptionCreate sessionToken={props.sessionToken} />
                    </Route>
                    <Route path="/subscription/mine">
                        <SubscriptionTable
                            sessionToken={props.sessionToken}
                            
                        />
                    </Route>
                    <Route path="/subscription/update/:id">
                        <SubscriptionEdit
                            sessionToken={props.sessionToken}
                            
                        />
                    </Route>
                    <Route path="/profile/update/:id">
                        <ProfileEdit
                            sessionToken={props.sessionToken}
                            
                        />
                    </Route>
                    <Route path="/admin/subscriptionList">
                        <AdminSubscriptionTblDel
                            sessionToken={props.sessionToken}
                            subscriptionId={props.subscriptionId}
                            updateSubscriptionId={props.updateSubscriptionId}
                        />
                    </Route>
                    <Route exact path="/admin/subscription">
                        <AdminSubscriptionMgmt />
                    </Route>
                    <Route  path="/admin/subscriptionEdit">
                        <AdminSubscriptionEdit
                            sessionToken={props.sessionToken}
                            subscriptionId={props.subscriptionId}
                        />
                    </Route>
                    <Route exact path="/profile/add">
                        <ProfileCreate sessionToken={props.sessionToken} />
                    </Route>
                    <Route exact path="/profile/mine">
                        <ProfileTable sessionToken={props.sessionToken} />
                    </Route>
                    <Route path="/admin/profileList">
                        <AdminProfileTblDel
                            sessionToken={props.sessionToken}
                            // profileId={props.profileId}
                            updateProfileId={props.updateProfileId}
                        />
                    </Route>
                    <Route path="/admin/profileEdit">
                        <AdminProfileEdit
                            sessionToken={props.sessionToken}
                            updateProfileId={props.updateProfileId}
                        />
                    </Route>
                    <Route path="/profile/mine/:id">
                        <ProfileEdit
                            sessionToken={props.sessionToken}
                            
                        />
                    </Route>
                    <Route path="/admin/profiles">
                        <AdminProfileMgmt />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default SwitchController;