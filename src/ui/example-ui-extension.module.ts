import { NgModule } from '@angular/core';
import { addNavMenuItem, SharedModule, addNavMenuSection } from '@vendure/admin-ui/core';

// import { ReviewCountLinkComponent } from './components/review-count-link/review-count-link.component';
// import { StarRatingComponent } from './components/star-rating/star-rating.component';
// import { ReviewsSharedModule } from './reviews-shared.module';

@NgModule({
    imports: [SharedModule],
    // declarations: [ReviewCountLinkComponent],
    providers: [
        // registerCustomFieldComponent('Product', 'reviewCount', ReviewCountLinkComponent),
        // registerCustomFieldComponent('Product', 'reviewRating', StarRatingComponent),
        addNavMenuSection(
            {
                id: 'examples',
                label: 'Examples',
                items: [
                    {
                        id: 'examples',
                        label: 'Examples',
                        routerLink: ['/extensions/examples'],
                        icon: 'star',
                    },
                ],
            },
            'settings',
        ),
    ],
    exports: [],
})
export class ExampleUiExtensionModule {}
