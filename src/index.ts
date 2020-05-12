/* eslint-disable max-classes-per-file */

import {
    Command,
    CommandFactory,
    Context,
    Printer,
    STDOUT_PRINTER_SERVICE,
    SubCommand,
    CommandArgs, COMMAND_FACTORY_PLUGIN_EXTENSION_POINT_ID
} from '@flowscripter/cli-framework';
import { ExtensionFactory, ExtensionDescriptor, Plugin } from '@flowscripter/esm-dynamic-plugins';

export class ExampleCliPluginCommandFactory implements CommandFactory {

    // eslint-disable-next-line class-methods-use-this
    public getCommands(): Iterable<Command> {
        return [
            {
                name: 'cat',
                description: 'The cat version of the classic example',
                options: [{
                    name: 'subject',
                    defaultValue: 'world',
                    description: 'Who to greet',
                    shortAlias: 's',
                    isOptional: true
                }],
                positionals: [],
                run: async (commandArgs: CommandArgs, context: Context): Promise<void> => {
                    // eslint-disable-next-line max-len
                    const printer = context.serviceRegistry.getServiceById(STDOUT_PRINTER_SERVICE) as unknown as Printer;
                    if (printer == null) {
                        throw new Error('STDOUT_PRINTER_SERVICE not available in context');
                    }
                    printer.info(`Miaow ${commandArgs.subject}\n`);
                }
            } as SubCommand,
            {
                name: 'dog',
                description: 'The dog version of the classic example',
                options: [{
                    name: 'subject',
                    defaultValue: 'world',
                    description: 'Who to greet',
                    shortAlias: 's',
                    isOptional: true
                }],
                positionals: [],
                run: async (commandArgs: CommandArgs, context: Context): Promise<void> => {
                    // eslint-disable-next-line max-len
                    const printer = context.serviceRegistry.getServiceById(STDOUT_PRINTER_SERVICE) as unknown as Printer;
                    if (printer == null) {
                        throw new Error('STDOUT_PRINTER_SERVICE not available in context');
                    }
                    printer.info(`Woof ${commandArgs.subject}\n`);
                }
            } as SubCommand
        ];
    }
}

class CommandFactoryExtensionFactory implements ExtensionFactory {
    // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-explicit-any
    public create(): Promise<any> {
        return Promise.resolve(new ExampleCliPluginCommandFactory());
    }
}

export class ExampleCliPluginExtensionDescriptor implements ExtensionDescriptor<string> {

    public extensionPointId: string = COMMAND_FACTORY_PLUGIN_EXTENSION_POINT_ID;

    public factory: ExtensionFactory = new CommandFactoryExtensionFactory();

    public extensionData = 'Example CLI Plugin Extension Descriptor data';
}

export default class ExampleCliPlugin implements Plugin<string> {

    public extensionDescriptors: ExtensionDescriptor<string>[] = [
        new ExampleCliPluginExtensionDescriptor()
    ];

    public pluginData = 'Example CLI Plugin data';
}
