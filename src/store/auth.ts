import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {type UserProfile, type User} from 'firebase/auth';

type AuthState = {
    user: null | User;
    //userProfile: undefined | UserProfile;
    dispatchUser: (user: User | null) => void;
    //dispatchUserProfile: (userProfile: UserProfile | undefined) => void;
};

const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        user: null,
        dispatchUser(user) {
            if (!user) {
                set((state) => ({...state, user: null}));
                return;
            }

            set((state) => ({...state, user}));
        },
        // dispatchUserProfile(userProfile) {
        //     if (!userProfile) {
        //         set((state) => ({...state, userProfile: undefined}));
        //         return;
        //     }
        //
        //     const _userProfile: UserProfile = {
        //         accountType: userProfile.accountType,
        //         createdAt: userProfile.createdAt,
        //         updatedAt: userProfile.updatedAt,
        //         email: userProfile.email,
        //         fullName: userProfile.fullName,
        //         role: userProfile.role,
        //         dob: userProfile.dob,
        //         gender: userProfile.gender ?? undefined,
        //         nationality: userProfile.nationality ?? undefined,
        //         province: userProfile.province ?? undefined,
        //         reasonForBeenOffline: userProfile.reasonForBeenOffline ?? undefined,
        //         zipCode: userProfile.zipCode ?? undefined,
        //         onlineStatus: userProfile.onlineStatus ?? true,
        //         companyId: userProfile.companyId ?? undefined,
        //     };
        //     set((state) => ({
        //         ...state,
        //         userProfile: _userProfile,
        //     }));
        // },
    })),
);

export default useAuthStore;
