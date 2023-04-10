const WorkTreeCreator = require('file-structure-builder');
const {projectStructure, segmentStructure, sharedUIStructure, modelStructure} = require('./structures')




const Wtc1 = new WorkTreeCreator('car-buy/src', projectStructure, { tab: 4 })
    .addMethod('create', mb => mb
        .addType('slice', ['layer', 'name'], tb => tb
            .addAction(b => b.makeStructure('[layer]', segmentStructure), (args, config, helpers) => Object.keys(projectStructure).includes(args.layer)
                ? helpers.checkFileExistence(args.layer, args.name)
                    ? 'уже такая штука есть'
                    : ''
                : 'Нет данного слоя'
            ))
        .addType('ui', ['path', 'name'], tb => tb.addAction(b => b.makeStructure('[path]', sharedUIStructure)
        ))
        .addType('model', ['path', 'name'], tb => tb.addAction(b => b.makeStructure('[path]', modelStructure)))
    )
    .addMethod('add', mb => mb
        .addType('shared-ui', ['name'], tb => tb
            .addAction(b => b
                    .makeStructure('shared/ui', sharedUIStructure)
                    .rewriteFile('shared/ui/index.tsx', sb => sb
                        .appendToImport('reexport', ['[name -F]'], './[name -F]/[name -F]'))
                , (args, config, helpers) =>
                    helpers.checkFileExistence('shared/ui', args.name) ? 'Есть такое' : '')
        ))
Wtc1.launch();