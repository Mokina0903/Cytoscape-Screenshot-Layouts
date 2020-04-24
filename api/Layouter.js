class Layouter {
    constructor() {

        this.baseName = "";

        this.layout = {
            name: "cose-bilkent",
            ready: {},
            nodeDimensionsIncludeLabels: false,
            refresh: 30,
            fit: true,
            padding: 10,
            randomize: false,
            nodeRepulsion: this._nodeRepulsionOptions.min,
            idealEdgeLength: this._idealEdgeLenghtOptions.min,
            edgeElasticity: this._edgeElasticityOptions.min,
            gravity: this._gravityOptions.min,
            nestingFactor: 1,
            gravityRange: 3.8,
            gravityCompound: 1.5,
            gravityRangeCompound: 1.2,
            initialEnergyOnIncremental: 0.01,
            numIter: 25000,
            tile: false,
            animate: false,
        };

        this.amount = 0;
    }


    nextLayout() {
        this.layout.edgeElasticity = parseFloat(this.layout.edgeElasticity);
        this.layout.idealEdgeLength = parseFloat(this.layout.idealEdgeLength);
        this.layout.gravity = parseFloat(this.layout.gravity);
        this.layout.nodeRepulsion = parseFloat(this.layout.nodeRepulsion);

        if (this.layout.edgeElasticity <= this._edgeElasticityOptions.max) {
            if (this.layout.idealEdgeLength <= this._idealEdgeLenghtOptions.max) {
                if (this.layout.nodeRepulsion <= this._nodeRepulsionOptions.max) {
                    if (this.layout.gravity <= this._gravityOptions.max) {

                        this.layout.gravity = this.calcValue(this.layout.gravity, this._gravityOptions, 2);
                        this.amount++;
                        return this.layout;
                    }
                    this.layout.gravity = this._gravityOptions.min;

                    this.layout.nodeRepulsion = this.calcValue(this.layout.nodeRepulsion, this._nodeRepulsionOptions, 0);
                    this.amount++;
                    return this.layout;
                }
                this.layout.nodeRepulsion = this._nodeRepulsionOptions.min;

                this.layout.idealEdgeLength = this.calcValue(this.layout.idealEdgeLength, this._idealEdgeLenghtOptions, 0);
                this.amount++;
                return this.layout;
            }
            this.layout.idealEdgeLength = this._idealEdgeLenghtOptions.min;

            this.layout.edgeElasticity = this.calcValue(this.layout.edgeElasticity, this._edgeElasticityOptions, 4);
            this.amount++;
            return this.layout;
        }
        this.layout.edgeElasticity = this._edgeElasticityOptions.min;

        console.log(this.amount);
        return "finished";
    }

    calcValue(value, options, percision) {
        const newVal = value + options.step;
        return newVal.toFixed(percision);
    }

    currentLayout() {
        return this.layout;
    }


    setBaseName(fileBase) {
        this.baseName = fileBase;
    }

    getFileName() {
        return this.baseName +
            "_EE" + this.layout.edgeElasticity +
            "_IEL" +this.layout.idealEdgeLength +
            "_NR" + this.layout.nodeRepulsion +
            "_G" + this.layout.gravity;
    }

    _edgeElasticityOptions = {
        min: 0.0001,
        max: 0.1,
        step: 0.1
    };

    _idealEdgeLenghtOptions = {
        min: 40,
        max: 160,
        step: 20
    };

    _nodeRepulsionOptions = {
        min: 500,
        max: 6000,
        step: 400
    };

    _gravityOptions = {
        min: 0.1,
        max: 6,
        step: 0.5
    };

}


class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new Layouter();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;
