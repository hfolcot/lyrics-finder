describe("Lyric Finder", function() {
        describe("resetPage", function() {
            it("should clear the results container when invoked", function() {
                resetPage();
                expect(resultsSection.innerHTML).toBe("");
            });
        });
});
