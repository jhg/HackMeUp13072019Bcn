'use strict';

function split(text, delimiter){
  let result = [];
  // It doesn't make sense split an empty string
  if (text.length > 0) {
    // Keep remain delimiter part to search, next item and
    //  ignored (part of possible delimiter)
    let delimiter_remain = delimiter;
    let item = "";
    let ignored = "";
    for (var i = 0; i < text.length; i++) {
      if (delimiter_remain === "" && delimiter === ignored) {
        result.push(item);
        item = "";
        ignored = "";
        delimiter_remain = delimiter;
      }
      // After check if we found an item continue checking string
      if (text[i] === delimiter_remain[0]) {
        ignored += text[i];
        delimiter_remain = delimiter_remain.slice(1);
      } else {
        // Ignored is not a delimiter finally
        item += ignored + text[i];
        ignored = "";
        delimiter_remain = delimiter;
      }
    }
    // After check all string we could have a last item
    if (delimiter_remain === "" && delimiter === ignored) {
      // We have an delimiter just in the end, then final item is an empty string
      result.push(item);
      result.push("");
    // Final item in the end or
    //  final item with ignored partial delimiter as part of final item
    } else if (delimiter === ignored) {
      result.push(item);
    } else {
      result.push(item + ignored);
    }
  }
  return result;
};

module.exports = {
  split
}
