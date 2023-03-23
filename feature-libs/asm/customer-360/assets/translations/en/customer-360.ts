/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const customer360 = {
  customer360: {
    header: {
      title: 'Customer Profile',
      subTitle: '{{name}} Customer 360\xB0 View',
      activeCartLabel: '{{cartSize}} item added to cart',
      recentOrderLabel: 'Last order {{price}}',
    },
    productListing: {
      totalNoItems: 'Total No. Items {{count}}',
      totalPrice: 'Total Price {{price}}',
      showMore: 'Show More',
      showLess: 'Show Less',
    },
    productItem: {
      outOfStock: 'Out of Stock',
      quantity: 'Qty: {{count}}',
      itemPrice: 'Item Price: {{price}}',
    },
    activeCart: {
      header: 'Active Cart',
      emptyDescription: 'There are currently no active cart Items',
      aria: {
        linkLabel: 'Active Cart {{code}}',
      },
    },
    savedCart: {
      header: 'Last Saved Cart',
      emptyDescription: 'There are currently no saved cart items',
      aria: {
        linkLabel: 'Last Saved Cart {{code}}',
      },
    },
    productInterests: {
      header: 'Interests',
      emptyDescription: 'There are currently no interest items',
    },
    profile: {
      address: 'Address',
      billingAddress: 'Billing Address',
      deliveryAddress: 'Delivery Address',
      phone1: 'Phone 1',
      phone2: 'Phone 2',
      paymentMethodHeader: 'Saved Payment Methods',
    },
    activity: {
      type: 'Type',
      id: 'Id',
      description: 'Description',
      status: 'Status',
      created: 'Created',
      updated: 'Updated',
      numberOfCartItems: 'Cart with {{count}} items',
      cart: 'Cart',
      order: 'Order',
      savedCart: 'Saved Cart',
      emptyStateText: 'There is currently no recorded customer activity',
      headerText: 'General',
    },
    productReviews: {
      columnHeaders: {
        item: 'Item',
        dateAndStatus: 'Date / Status',
        rating: 'Rating',
        review: 'Review',
      },
      header: 'Product Reviews',
      emptyDescription: 'There are currently no product review items',
      sku: 'SKU',
    },
    maps: {
      storeClosed: 'Close',
      storesFound: '{{ initial }} - {{ end }} from {{ total }} stores found',
    },
    overviewTab: 'Overview',
    profileTab: 'Profile',
    activityTab: 'Activity',
    feedbackTab: 'Feedback',
    promotionsTab: 'Promotion',
    mapsTab: 'Maps',
    aria: {
      activeCartCode: 'Active Cart {{code}}',
      recentOrderCode: 'Last Order {{code}}',
    },
    pagination: 'Pagination',
    page: 'Page {{number}}',
    emptyCellValue: '---',
  },
};
