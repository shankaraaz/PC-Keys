# Security Specification for Netlyrakeys Firestore Database

## 1. Data Invariants
- **Products**: Anyone can browse (`read`), but modifying products is restricted.
- **Orders**: A user can create an order where `userId` strictly matches their own authenticated UID. Users can only fetch/list their own orders. Orders are immutable once created.
- **User Profiles**: Users can read and write only their own profiles (`userId == request.auth.uid`). Profile editing is blocked for other users.

## 2. The "Dirty Dozen" Payloads (Denial Scenarios)
1. **Unauthenticated Product Mod**: Trying to update product prices without being signed in. (Denied)
2. **Product Price Poisioning**: Trying to set product price to a negative value or non-number. (Denied)
3. **Spoof User Creation**: User A trying to write user profile for User B. (Denied)
4. **Order Ownership Spoofing**: User A creating an order with User B's `userId`. (Denied)
5. **PII Data Read**: Guest trying to read a private user profile. (Denied)
6. **Order Tampering**: User trying to update an existing order to mark it as "refunded" or change the keys. (Denied)
7. **Order Deletion**: User trying to delete their order history. (Denied)
8. **Mass Scraping of Orders**: User trying to fetch all orders in the database. (Denied)
9. **Junk ID Insertion**: Writing an order with a 2MB long ID to bloat database costs. (Denied)
10. **Timestamp Falsification**: Client providing a hardcoded future date for `createdAt` instead of using `request.time`. (Denied)
11. **Negative Quantities**: Submitting an order with negative item quantities or prices. (Denied)
12. **Admin Claim Hijacking**: Attempting to set an `isAdmin` or `role` property in user profile to elevate privileges. (Denied)

## 3. Test Runner Concept
Verify that all "Dirty Dozen" payloads return `PERMISSION_DENIED` under the rules defined in `firestore.rules`.
