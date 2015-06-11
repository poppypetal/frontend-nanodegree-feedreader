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
     describe('RSS Feeds', function() {
         /* This is our first test - it tests to make sure that the
          * allFeeds variable has been defined and that it is not
          * empty. Experiment with this before you get started on
          * the rest of this project. What happens when you change
          * allFeeds in app.js to be an empty array and refresh the
          * page?
          */
        it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
        });
     });

     describe('URL Defined', function(){
        allFeeds.forEach(function(allFeeds){
          it('has a url', function(){
            expect(allFeeds.url).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
          });
          it('has a name', function(){
            expect(allFeeds.name).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
          });
        });
     });

     describe('The menu', function(){
        it('initially hides menu', function(){
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        it('ensures menu changes visibility when the menu icon is clicked', function(){
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden')).toBe(false);
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
     });

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

     describe('New Feed Selection', function(){
        var content;
        var newContent;
        beforeEach(function(done){
          $('.feed').empty();
            loadFeed(0, function() {
              content = $('.feed').html();
              loadFeed(1, done);
            });
        });
        it('ensures the new feed is loaded and the content changes', function(done){
          newContent = $('.feed').html();
          expect(content).not.toBe(newContent);
          done();
        });
        afterAll(function(done) {
          loadFeed(0, done);
        });
     });
}());
