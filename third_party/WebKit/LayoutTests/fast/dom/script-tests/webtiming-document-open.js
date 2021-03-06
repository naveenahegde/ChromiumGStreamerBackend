window.performance = window.performance || {};
var navigation = performance.navigation || {};
var timing = performance.timing || {};
var originalTiming = {};

window.addEventListener("load", function() { setTimeout(testTimingWithDocumentOpen, 0); }, false);

function testTimingWithDocumentOpen()
{
    for (property in timing) {
        originalTiming[property] = timing[property];
    }

    document.open();
    document.write("<html>");
    document.write("<head>");
    document.write("<script src=\"../../resources/js-test.js\"></script>");
    document.write("</head>");
    document.write("<body>");
    document.write("</body>");
    document.write("</html>");
    document.close();

    description("This test verifies that the NavigationTimings don't change after a document.open().");

    setTimeout(finishTest, 0);
}

function finishTest() {
    var properties = getAllPropertyNames(timing);
    for (var i = 0; i < properties.length; ++i) {
        shouldBe("timing." + properties[i], "originalTiming." + properties[i]);
    }

    finishJSTest();
}

jsTestIsAsync = true;
