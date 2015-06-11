/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
 $(function() {
     /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
//This test suite tests to make sure that the allFeeds variable has been defined and that it is not empty.
     describe('RSS Feeds', function() {
        it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
        });
     });
//This test suite tests to make sure that a url has been defined and
     describe('URL Defined', function(){
//the it functions loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
        allFeeds.forEach(function(allFeeds){
          it('has a url', function(){
            expect(allFeeds.url).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
          });
//This is a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
          it('has a name', function(){
            expect(allFeeds.name).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
          });
        });
     });
//This test suite deals with the menu visibility
     describe('The menu', function(){
//This test that ensures the menu element is hidden by default.
        it('initially hides menu', function(){
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
//This test ensures that the menu changes visibility when the menu icon is clicked.
        it('ensures menu changes visibility when the menu icon is clicked', function(){
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden')).toBe(false);
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
     });
//This test stuite test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed. container.
     describe('Initial Entries', function() {
        beforeEach(function(done){
          loadFeed(0,done);
        });
        it("should have at least 1 entry", function(done){
          expect($('.feed').length).toBeGreaterThan(0);
          expect($('.entry').length).toBeGreaterThan(0);
          done();
        });
     });
//This test suite checks to see if test that when a new feed is loaded by the loadFeed function that the content actually changes.
     describe('New Feed Selection', function(){
        var first;
        var second;
        beforeEach(function(done){
          $('.feed').empty();
          loadFeed(0, function() {
          first = $('.feed').html();
          loadFeed(1, done);
          });
        });
        it('ensures the new feed is loaded and the content changes', function(done){
          second = $('.feed').html();
          expect(first).not.toBe(second);
          done(); //if I delete this line then the jasmine doesn't fully load on the page
        });
        afterAll(function(done) {
        loadFeed(0, done);
        });
     });
}());
