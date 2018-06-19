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
