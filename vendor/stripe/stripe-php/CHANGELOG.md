# Changelog

## 6.31.4 - 2019-04-05
* [#624](https://github.com/stripe/stripe-php/pull/624) Fix encoding of nested parameters in multipart requests

## 6.31.3 - 2019-04-02
* [#623](https://github.com/stripe/stripe-php/pull/623) Only use HTTP/2 with curl >= 7.60.0

## 6.31.2 - 2019-03-25
* [#619](https://github.com/stripe/stripe-php/pull/619) Fix PHPDoc return types for list methods for nested resources

## 6.31.1 - 2019-03-22
* [#612](https://github.com/stripe/stripe-php/pull/612) Add a lot of constants
* [#614](https://github.com/stripe/stripe-php/pull/614) Add missing subscription status constants

## 6.31.0 - 2019-03-18
* [#600](https://github.com/stripe/stripe-php/pull/600) Add support for the `PaymentMethod` resource and APIs
* [#606](https://github.com/stripe/stripe-php/pull/606) Add support for retrieving a Checkout `Session`
* [#611](https://github.com/stripe/stripe-php/pull/611) Add support for deleting a Terminal `Location` and `Reader`

## 6.30.5 - 2019-03-11
* [#607](https://github.com/stripe/stripe-php/pull/607) Correctly handle case where a metadata key is called `metadata`

## 6.30.4 - 2019-02-27
* [#602](https://github.com/stripe/stripe-php/pull/602) Add `subscription_schedule` to `Subscription` for PHPDoc.

## 6.30.3 - 2019-02-26
* [#603](https://github.com/stripe/stripe-php/pull/603) Improve PHPDoc on the `Source` object to cover all types of Sources currently supported.

## 6.30.2 - 2019-02-25
* [#601](https://github.com/stripe/stripe-php/pull/601) Fix PHPDoc across multiple resources and add support for new events.

## 6.30.1 - 2019-02-16
* [#599](https://github.com/stripe/stripe-php/pull/599) Fix PHPDoc for `SubscriptionSchedule` and `SubscriptionScheduleRevision`

## 6.30.0 - 2019-02-12
* [#590](https://github.com/stripe/stripe-php/pull/590) Add support for `SubscriptionSchedule` and `SubscriptionScheduleRevision`

## 6.29.3 - 2019-01-31
* [#592](https://github.com/stripe/stripe-php/pull/592) Some more PHPDoc fixes

## 6.29.2 - 2019-01-31
* [#591](https://github.com/stripe/stripe-php/pull/591) Fix PHPDoc for nested resources

## 6.29.1 - 2019-01-25
* [#566](https://github.com/stripe/stripe-php/pull/566) Fix dangling message contents
* [#586](https://github.com/stripe/stripe-php/pull/586) Don't overwrite `CURLOPT_HTTP_VERSION` option

## 6.29.0 - 2019-01-23
* [#579](https://github.com/stripe/stripe-php/pull/579) Rename `CheckoutSession` to `Session` and move it under the `Checkout` namespace. This is a breaking change, but we've reached out to affected merchants and all new merchants would use the new approach.

## 6.28.1 - 2019-01-21
* [#580](https://github.com/stripe/stripe-php/pull/580) Properly serialize `individual` on `Account` objects

## 6.28.0 - 2019-01-03
* [#576](https://github.com/stripe/stripe-php/pull/576) Add support for iterating directly over `Collection` instances

## 6.27.0 - 2018-12-21
* [#571](https://github.com/stripe/stripe-php/pull/571) Add support for the `CheckoutSession` resource

## 6.26.0 - 2018-12-11
* [#568](https://github.com/stripe/stripe-php/pull/568) Enable persistent connections

## 6.25.0 - 2018-12-10
* [#567](https://github.com/stripe/stripe-php/pull/567) Add support for account links

## 6.24.0 - 2018-11-28
* [#562](https://github.com/stripe/stripe-php/pull/562) Add support for the Review resource
* [#564](https://github.com/stripe/stripe-php/pull/564) Add event name constants for subscription schedule aborted/expiring

## 6.23.0 - 2018-11-27
* [#542](https://github.com/stripe/stripe-php/pull/542) Add support for `ValueList` and `ValueListItem` for Radar 

## 6.22.1 - 2018-11-20
* [#561](https://github.com/stripe/stripe-php/pull/561) Add cast and some docs to telemetry introduced in 6.22.0/#549

## 6.22.0 - 2018-11-15
* [#549](https://github.com/stripe/stripe-php/pull/549) Add support for client telemetry

## 6.21.1 - 2018-11-12
* [#548](https://github.com/stripe/stripe-php/pull/548) Don't mutate `Exception` class properties from `OAuthBase` error

## 6.21.0 - 2018-11-08
* [#537](https://github.com/stripe/stripe-php/pull/537) Add new API endpoints for the `Invoice` resource.

## 6.20.1 - 2018-11-07
* [#546](https://github.com/stripe/stripe-php/pull/546) Drop files from the Composer package that aren't needed in the release

## 6.20.0 - 2018-10-30
* [#536](https://github.com/stripe/stripe-php/pull/536) Add support for the `Person` resource
* [#541](https://github.com/stripe/stripe-php/pull/541) Add support for the `WebhookEndpoint` resource

## 6.19.5 - 2018-10-17
* [#539](https://github.com/stripe/stripe-php/pull/539) Fix methods on `\Stripe\PaymentIntent` to properly pass arguments to the API.

## 6.19.4 - 2018-10-11
* [#534](https://github.com/stripe/stripe-php/pull/534) Fix PSR-4 autoloading for `\Stripe\FileUpload` class alias

## 6.19.3 - 2018-10-09
* [#530](https://github.com/stripe/stripe-php/pull/530) Add constants for `flow` (`FLOW_*`), `status` (`STATUS_*`) and `usage` (`USAGE_*`) on `\Stripe\Source`

## 6.19.2 - 2018-10-08
* [#531](https://github.com/stripe/stripe-php/pull/531) Store HTTP response headers in case-insensitive array

## 6.19.1 - 2018-09-25
* [#526](https://github.com/stripe/stripe-php/pull/526) Ignore null values in request parameters

## 6.19.0 - 2018-09-24
* [#523](https://github.com/stripe/stripe-php/pull/523) Add support for Stripe Terminal

## 6.18.0 - 2018-09-24
* [#520](https://github.com/stripe/stripe-php/pull/520) Rename `\Stripe\FileUpload` to `\Stripe\File`

## 6.17.2 - 2018-09-18
* [#522](https://github.com/stripe/stripe-php/pull/522) Fix warning when adding a new additional owner to an existing array

## 6.17.1 - 2018-09-14
* [#517](https://github.com/stripe/stripe-php/pull/517) Integer-index encode all sequential arrays

## 6.17.0 - 2018-09-05
* [#514](https://github.com/stripe/stripe-php/pull/514) Add support for reporting resources

## 6.16.0 - 2018-08-23
* [#509](https://github.com/stripe/stripe-php/pull/509) Add support for usage record summaries

## 6.15.0 - 2018-08-03
* [#504](https://github.com/stripe/stripe-php/pull/504) Add cancel support for topups

## 6.14.0 - 2018-08-02
* [#505](https://github.com/stripe/stripe-php/pull/505) Add support for file links

## 6.13.0 - 2018-07-31
* [#502](https://github.com/stripe/stripe-php/pull/502) Add `isDeleted()` method to `\Stripe\StripeObject`

## 6.12.0 - 2018-07-28
* [#501](https://github.com/stripe/stripe-php/pull/501) Add support for scheduled query runs (`\Stripe\Sigma\ScheduledQueryRun`) for Sigma

## 6.11.0 - 2018-07-26
* [#500](https://github.com/stripe/stripe-php/pull/500) Add support for Stripe Issuing

## 6.10.4 - 2018-07-19
* [#498](https://github.com/stripe/stripe-php/pull/498) Internal improvements to the `\Stripe\ApiResource.classUrl()` method

## 6.10.3 - 2018-07-16
* [#497](https://github.com/stripe/stripe-php/pull/497) Use HTTP/2 only for HTTPS requests

## 6.10.2 - 2018-07-11
* [#494](https://github.com/stripe/stripe-php/pull/494) Enable HTTP/2 support

## 6.10.1 - 2018-07-10
* [#493](https://github.com/stripe/stripe-php/pull/493) Add PHPDoc for `auto_advance` on `\Stripe\Invoice`

## 6.10.0 - 2018-06-28
* [#488](https://github.com/stripe/stripe-php/pull/488) Add support for `$appPartnerId` to `Stripe::setAppInfo()`

## 6.9.0 - 2018-06-28
* [#487](https://github.com/stripe/stripe-php/pull/487) Add support for payment intents

## 6.8.2 - 2018-06-24
* [#486](https://github.com/stripe/stripe-php/pull/486) Make `Account.deauthorize()` return the `StripeObject` from the API

## 6.8.1 - 2018-06-13
* [#472](https://github.com/stripe/stripe-php/pull/472) Added phpDoc for `ApiRequestor` and others, especially regarding thrown errors

## 6.8.0 - 2018-06-13
* [#481](https://github.com/stripe/stripe-php/pull/481) Add new `\Stripe\Discount` and `\Stripe\OrderItem` classes, add more PHPDoc describing object attributes

## 6.7.4 - 2018-05-29
* [#480](https://github.com/stripe/stripe-php/pull/480) PHPDoc changes for API version 2018-05-21 and the addition of the new `CHARGE_EXPIRED` event type

## 6.7.3 - 2018-05-28
* [#479](https://github.com/stripe/stripe-php/pull/479) Fix unnecessary traits on `\Stripe\InvoiceLineItem`

## 6.7.2 - 2018-05-28
* [#471](https://github.com/stripe/stripe-php/pull/471) Add `OBJECT_NAME` constant to all API resource classes, add `\Stripe\InvoiceLineItem` class

## 6.7.1 - 2018-05-13
* [#468](https://github.com/stripe/stripe-php/pull/468) Update fields in PHP docs for accuracy

## 6.7.0 - 2018-05-09
* [#466](https://github.com/stripe/stripe-php/pull/466) Add support for issuer fraud records

## 6.6.0 - 2018-04-11
* [#460](https://github.com/stripe/stripe-php/pull/460) Add support for flexible billing primitives

## 6.5.0 - 2018-04-05
* [#461](https://github.com/stripe/stripe-php/pull/461) Don't zero keys on non-`metadata` subobjects

## 6.4.2 - 2018-03-17
* [#458](https://github.com/stripe/stripe-php/pull/458) Add PHPDoc for `account` on `\Stripe\Event`

## 6.4.1 - 2018-03-02
* [#455](https://github.com/stripe/stripe-php/pull/455) Fix namespaces in PHPDoc
* [#456](https://github.com/stripe/stripe-php/pull/456) Fix namespaces for some exceptions

## 6.4.0 - 2018-02-28
* [#453](https://github.com/stripe/stripe-php/pull/453) Add constants for `reason` (`REASON_*`) and `status` (`STATUS_*`) on `\Stripe\Dispute`

## 6.3.2 - 2018-02-27
* [#452](https://github.com/stripe/stripe-php/pull/452) Add PHPDoc for `amount_paid` and `amount_remaining` on `\Stripe\Invoice`

## 6.3.1 - 2018-02-26
* [#443](https://github.com/stripe/stripe-php/pull/443) Add event types as constants to `\Stripe\Event` class

## 6.3.0 - 2018-02-23
* [#450](https://github.com/stripe/stripe-php/pull/450) Add support for `code` attribute on all Stripe exceptions

## 6.2.0 - 2018-02-21
* [#440](https://github.com/stripe/stripe-php/pull/440) Add support for topups
* [#442](https://github.com/stripe/stripe-php/pull/442) Fix PHPDoc for `\Stripe\Error\SignatureVerification`

## 6.1.0 - 2018-02-12
* [#435](https://github.com/stripe/stripe-php/pull/435) Fix header persistence on `Collection` objects
* [#436](https://github.com/stripe/stripe-php/pull/436) Introduce new `Idempotency` error class

## 6.0.0 - 2018-02-07
Major version release. List of backwards incompatible changes to watch out for:
+ The minimum PHP version is now 5.4.0. If you're using PHP 5.3 or older, consider upgrading to a more recent version.
* `\Stripe\AttachedObject` no longer exists. Attributes that used to be instances of `\Stripe\AttachedObject` (such as `metadata`) are now instances of `\Stripe\StripeObject`.
+ Attributes that used to be PHP arrays (such as `legal_entity->additional_owners` on `\Stripe\Account` instances) are now instances of `\Stripe\StripeObject`, except when they are empty. `\Stripe\StripeObject` has array semantics so this should not be an issue unless you are actively checking types.
* `\Stripe\Collection` now derives from `\Stripe\StripeObject` rather than from `\Stripe\ApiResource`.

Pull requests included in this release:
* [#410](https://github.com/stripe/stripe-php/pull/410) Drop support for PHP 5.3
* [#411](https://github.com/stripe/stripe-php/pull/411) Use traits for common API operations
* [#414](https://github.com/stripe/stripe-php/pull/414) Use short array syntax
* [#404](https://github.com/stripe/stripe-php/pull/404) Fix serialization logic
* [#417](https://github.com/stripe/stripe-php/pull/417) Remove `ExternalAccount` class
* [#418](https://github.com/stripe/stripe-php/pull/418) Increase test coverage
* [#421](https://github.com/stripe/stripe-php/pull/421) Update CA bundle and add script for future updates
* [#422](https://github.com/stripe/stripe-php/pull/422) Use vendored CA bundle for all requests
* [#428](https://github.com/stripe/stripe-php/pull/428) Support for automatic request retries

## 5.9.2 - 2018-02-07
* [#431](https://github.com/stripe/stripe-php/pull/431) Update PHPDoc @property tags for latest API version

## 5.9.1 - 2018-02-06
* [#427](https://github.com/stripe/stripe-php/pull/427) Add and update PHPDoc @property tags on all API resources

## 5.9.0 - 2018-01-17
* [#421](https://github.com/stripe/stripe-php/pull/421) Updated bundled CA certificates
* [#423](https://github.com/stripe/stripe-php/pull/423) Escape unsanitized input in OAuth example

## 5.8.0 - 2017-12-20
* [#403](https://github.com/stripe/stripe-php/pull/403) Add `__debugInfo()` magic method to `StripeObject`

## 5.7.0 - 2017-11-28
* [#390](https://github.com/stripe/stripe-php/pull/390) Remove some unsupported API methods
* [#391](https://github.com/stripe/stripe-php/pull/391) Alphabetize the list of API resources in `Util::convertToStripeObject()` and add missing resources
* [#393](https://github.com/stripe/stripe-php/pull/393) Fix expiry date update for card sources

## 5.6.0 - 2017-10-31
* [#386](https://github.com/stripe/stripe-php/pull/386) Support for exchange rates APIs

## 5.5.1 - 2017-10-30
* [#387](https://github.com/stripe/stripe-php/pull/387) Allow `personal_address_kana` and `personal_address_kanji` to be updated on an account

## 5.5.0 - 2017-10-27
* [#385](https://github.com/stripe/stripe-php/pull/385) Support for listing source transactions

## 5.4.0 - 2017-10-24
* [#383](https://github.com/stripe/stripe-php/pull/383) Add static methods to manipulate resources from parent
    * `Account` gains methods for external accounts and login links (e.g. `createExternalAccount`, `createLoginLink`)
    * `ApplicationFee` gains methods for refunds
    * `Customer` gains methods for sources
    * `Transfer` gains methods for reversals

## 5.3.0 - 2017-10-11
* [#378](https://github.com/stripe/stripe-php/pull/378) Rename source `delete` to `detach` (and deprecate the former)

## 5.2.3 - 2017-09-27
* Add PHPDoc for `Card`

## 5.2.2 - 2017-09-20
* Fix deserialization mapping of `FileUpload` objects

## 5.2.1 - 2017-09-14
* Serialized `shipping` nested attribute

## 5.2.0 - 2017-08-29
* Add support for `InvalidClient` OAuth error

## 5.1.3 - 2017-08-14
* Allow `address_kana` and `address_kanji` to be updated for custom accounts

## 5.1.2 - 2017-08-01
* Fix documented return type of `autoPagingIterator()` (was missing namespace)

## 5.1.1 - 2017-07-03
* Fix order returns to use the right URL `/v1/order_returns`

## 5.1.0 - 2017-06-30
* Add support for OAuth

## 5.0.0 - 2017-06-27
* `pay` on invoice now takes params as well as opts

## 4.13.0 - 2017-06-19
* Add support for ephemeral keys

## 4.12.0 - 2017-06-05
* Clients can implement `getUserAgentInfo()` to add additional user agent information

## 4.11.0 - 2017-06-05
* Implement `Countable` for `AttachedObject` (`metadata` and `additional_owners`)

## 4.10.0 - 2017-05-25
* Add support for login links

## 4.9.1 - 2017-05-10
* Fix docs to include arrays on `$id` parameter for retrieve methods

## 4.9.0 - 2017-04-28
* Support for checking webhook signatures

## 4.8.1 - 2017-04-24
* Allow nested field `payout_schedule` to be updated

## 4.8.0 - 2017-04-20
* Add `\Stripe\Stripe::setLogger()` to support an external PSR-3 compatible logger

## 4.7.0 - 2017-04-10
* Add support for payouts and recipient transfers

## 4.6.0 - 2017-04-06
* Please see 4.7.0 instead (no-op release)	

## 4.5.1 - 2017-03-22
* Remove hard dependency on cURL

## 4.5.0 - 2017-03-20
* Support for detaching sources from customers

## 4.4.2 - 2017-02-27
* Correct handling of `owner` parameter when updating sources

## 4.4.1 - 2017-02-24
* Correct the error check on a bad JSON decoding

## 4.4.0 - 2017-01-18
* Add support for updating sources

## 4.3.0 - 2016-11-30
* Add support for verifying sources

## 4.2.0 - 2016-11-21
* Add retrieve method for 3-D Secure resources

## 4.1.1 - 2016-10-21
* Add docblock with model properties for `Plan`

## 4.1.0 - 2016-10-18
* Support for 403 status codes (permission denied)

## 4.0.1 - 2016-10-17
* Fix transfer reversal materialization
* Fixes for some property definitions in docblocks

## 4.0.0 - 2016-09-28
* Support for subscription items
* Drop attempt to force TLS 1.2: please note that this could be breaking if you're using old OS distributions or packages and upgraded recently (so please make sure to test your integration!)

## 3.23.0 - 2016-09-15
* Add support for Apple Pay domains

## 3.22.0 - 2016-09-13
* Add `Stripe::setAppInfo` to allow plugins to register user agent information

## 3.21.0 - 2016-08-25
* Add `Source` model for generic payment sources

## 3.20.0 - 2016-08-08
* Add `getDeclineCod                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                