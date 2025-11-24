import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface ServiceRequestState {
    requests: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ServiceRequestState = {
    requests: [],
    loading: false,
    error: null,
};

export const ServiceRequestStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        addRequest(request: any) {
            patchState(store, { loading: true });
            // Simulate API call
            setTimeout(() => {
                patchState(store, (state) => ({
                    requests: [...state.requests, request],
                    loading: false,
                }));
                console.log('Request submitted:', request);
            }, 1000);
        },
    }))
);
