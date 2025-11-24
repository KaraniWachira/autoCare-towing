import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
        // Set initial styles for entering and leaving pages
        query(':enter, :leave', [
            style({
                position: 'absolute',
                width: '100%',
                opacity: 0,
            })
        ], { optional: true }),

        // Animate the entering page
        query(':enter', [
            animate('400ms ease-in-out', style({ opacity: 1 }))
        ], { optional: true }),
    ])
]);

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* <=> *', [
        query(':enter', [
            style({ opacity: 0 })
        ], { optional: true }),
        query(':leave', [
            animate('300ms', style({ opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
            animate('300ms', style({ opacity: 1 }))
        ], { optional: true }),
    ])
]);
