/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/
exports.isValidXML = xmlString => {
  const validateTagRegex = /^<([^<]+)*(?:>(.*)<\/\1>|\/>)/;
  const tagSplitingRegex = /[<][^>]*[>]/gi;
  let tagStringSpliting = xmlString.match(tagSplitingRegex);
  let regedString = xmlString.match(validateTagRegex);

  // check empty xml
  if (xmlString.length === 0) {
    return false;
  }

  // check bad tags like <<a></a> (double open ?)
  if (xmlString.match(/^<[^<>]*</)) {
    return false;
  }

  //
  if (!regedString) {
    return false;
  }

  // checking has children nodes
  if (typeof regedString[2] === "string") {
    // check badly ordered tags and
    // check in children nodes has un closed node
    if (
      !!regedString[2].match(tagSplitingRegex) &&
      !regedString[2].match(validateTagRegex)
    ) {
      return false;
    }

    // check depth of more than 2
    let secondRegedString = regedString[2].match(validateTagRegex);
    if (!!secondRegedString && !!secondRegedString[2].match(validateTagRegex)) {
      return false;
    }
  }

  // check has same nodes;
  for (let i = 0; i < tagStringSpliting.length; i++) {
    for (let j = i + 1; j < tagStringSpliting.length; j++) {
      if (tagStringSpliting[i] === tagStringSpliting[j]) {
        return false;
      }
    }
  }

  return true;
};
