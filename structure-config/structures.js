const {EMPTY_COMPONENT_DATA, EMPTY_STORY_DATA, EMPTY_SLICE_DATA, EMPTY_NAMESPACE_DATA,
    EMPTY_MODEL_INDEX_DATA, EMPTY_SELECTORS_DATA, EMPTY_SLICE_INDEX_DATA, EMPTY_SCSS_MODULE_DATA
} = require('./data')

const projectStructure = {
    shared: null,
    entities: null,
    widgets: null,
    pages: null,
    features: null,
    app: null,
}

const UIStructure = {
    '[name -F -file-tsx]': EMPTY_COMPONENT_DATA,
    '[name -F].module.scss': EMPTY_SCSS_MODULE_DATA,
    '[name -F].stories.tsx': EMPTY_STORY_DATA,
}

const sharedUIStructure = {
    '[name -F]': UIStructure
}

const segmentStructure = {
    '[name -F]': {
        'ui': UIStructure,
        'index.ts': EMPTY_SLICE_INDEX_DATA
    }
}

const modelStructure = {
    'model': {
        'selectors.ts': EMPTY_SELECTORS_DATA,
        'slice.ts': EMPTY_SLICE_DATA,
        'index.ts': EMPTY_MODEL_INDEX_DATA
    },
    'namespace.ts': EMPTY_NAMESPACE_DATA
}

module.exports = {
    segmentStructure, projectStructure, sharedUIStructure, modelStructure
}



