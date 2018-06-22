describe("Lyric Finder", function() {
        describe("resetPage", function() {
            it("should clear the results table when invoked", function() {
                resetPage();
                expect(resultsSection.innerHTML).toBe("");
            });
            it("should remove the back button when invoked", function() {
                resetPage();
                expect(backButton.innerHTML).toBe("");
            });
        });
});


    
/*Add to index.html to use Jasmine testing
<script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.1.0/jasmine.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.1.0/jasmine-html.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.1.0/boot.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.1.0/jasmine.css" />
<script type="text/javascript" src="assets/js/spec.js"></script>*/