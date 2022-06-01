# Multiple microsites on the same domain using pages
This repo includes an example of how to host multiple microsites on a single domain using CloudFlare pages.
Pages by default are designed to own a whole domain. Whilst this is fine for a small site, bigger sites are better broken into separate microsite due to:
* Enabling a micro-services approach, with all the benefits that brings for multiple teams
* For a statically generated site only rebuilding certain sections of the site rather than everything

### Example
1. example.com/stores/*       -> stores microsite
1. example.com/appointments/* -> appointments microsite
1. example.com/*              -> default site

## Requirements
* The site behaves as a coherent experience for the user and they can't tell they are on different microsites
* Ability to build and deploy subsections of the site independently
* Ability to manage routing to the microsites based on a set of path rules including specific urls and globs.
* Prevent access directly to the individual microsites
* *Nice to have* Ability to have the different microsites as a monorepo or multi-repo

## Technical Approach
* We will deploy a pages app per microsite (each microsite can be built using different technologies or statically generated/ SPA). These pages apps will be protected by a pages plugin that enforces the presence of an authorisation header
* Deploy a worker that manages the routing between the different microsites and add the authorisation header to the sub site
* The worker and all the pages need to be set up with the same environment variables: PLUGIN_HEADER_NAME & PLUGIN_HEADER_VALUE

## Potential Issues
1. wrangler pages publish is a new tool, which has some bugs, for example: https://github.com/cloudflare/wrangler2/issues/938. This requires the publish commands to be run from the parent directory rather than in the nested directory.
1. wrangler requires the functions folder to be in the top scope, this means all the microsites are currently sharing the same functions folder, by preference this would be nested under the specific microsite folder
1. Need to be careful about path referencing, i.e. the microsites should be nested under the path they're used on as we need to make sure the referenced css, js and images are fetched from the microsite rather than the default app.

## Not included in the work so far
* Extract the functions folder as a proper pages plugin
* Handle routing properly
* Set up repo as a proper monorepo