/*** tracks configuraton props*/
class FileLocation {
    constructor(uri, locationType) {
        this.uri = uri;
        this.locationType = locationType;
    }
}

class Index {
    constructor(location) {
        this.location = location;
    }
}

class Adapter {
    constructor(type, bamLocation, index) {
        this.type = type;
        this.bamLocation = bamLocation;
        this.index = index;
    }
}

class Track {
    constructor(trackId, name, assemblyNames, type, adapter) {
        this.trackId = trackId;
        this.name = name;
        this.assemblyNames = assemblyNames;
        this.type = type;
        this.adapter = adapter;
    }
}

/*** dafault session configuraton props 
 * maxDisplayedBpPerPx - set file size limit to the view (display "FORCE LOAD" button)
 * height - sets height of the view
 * type - display type - LinearPileupDisplay, LinearReferenceSequenceDisplay
*/
class Display {
    constructor(type, height, maxDisplayedBpPerPx, configuration) {
        this.type = type;
        this.height = height;
        this.maxDisplayedBpPerPx = maxDisplayedBpPerPx;
        this.configuration = configuration;
    }
}

class ViewTrack {
    constructor(type, configuration, displays){
        this.type = type;
        this.configuration = configuration;
        this.displays = displays;
    }
}

class View {
    constructor(id, type, tracks){
        this.id = id;
        this.type = type;
        this.tracks = tracks;
    }
}

class Session {
    constructor(name, view){
        this.name = name;
        this.view = view;
    }
}

class Region {
    constructor(refName, start, end, assemblyName){
        this.refName = refName;
        this.start = start;
        this.end = end;
        this.assemblyName = assemblyName;
    }
}

module.exports = {
    FileLocation,
    Index,
    Adapter,
    Track,
    Display,
    View,
    ViewTrack,
    Session,
    Region,
}