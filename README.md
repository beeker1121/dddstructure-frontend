# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# TODO

- :heavy_check_mark: Fix bottom spacing of 'Invoices' header on invoices page, button causing spacing issues.
- :heavy_check_mark: Fix name, company, city, country display for bill to and pay to on invoices page. Currently just shows a comma (,) below the person's name if there's no city and country.
- :heavy_check_mark: Need a date selection dropdown.
- :heavy_check_mark: Need a currency selection dropdown.
- Need a country selection dropdown (ideally with flags).
- :heavy_check_mark: Money input and masking.
- Phone input masking.
- :heavy_check_mark: Subtotal calculation for line items.
- Total calculations for overall invoice.
- Invoice public payment page.
  - Accepts payments.
  - Updates invoice status.
  - Mobile friendly.
- Status on invoices search page.
- Finish invoices search page.
  - Need search filters.
  - :heavy_check_mark: Need pagination.
- Site footer.
- Finish homepage and about page.
- ToS and user agreement documents.
- Make mobile friendly.
  - Sidebar should be collapsible or a dropdown.
  - At the very least, make the invoice payment page mobile friendly.
- Add keypress watcher for all forms so users can just press enter to submit, such as on signup and login pages.
- !IMPORTANT - Need to handle all places where we console log errors.
  - Could have a notification slide down middle top of browser window.
