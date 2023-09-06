export default {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    test: [/\.stories\.jsx?$/],
                },
                loaderOptions: {
                    prettierConfig: {printWidth: 80, singleQuote: false},
                    options: {parser: 'typescript'}
                },
            },
        },
    ],

    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    }
};
