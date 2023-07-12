import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isDevelopment = process.env.NODE_ENV === "development";

rules.push(
    {
        test: /\.css$/,
        oneOf: [
            {
                test: /\.module\.css$/,
                use: [
                    isDevelopment
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { modules: true, importLoaders: 1 },
                    },
                ],
            },
            {
                use: [
                    isDevelopment
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
        ],
    },
    {
        test: /\.s[ac]ss$/i,
        oneOf: [
            {
                test: /\.module\.s[ac]ss$/,
                use: [
                    isDevelopment
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { modules: true, importLoaders: 1 },
                    },
                ],
            },
            {
                use: [
                    isDevelopment
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    }
);

export const rendererConfig: Configuration = {
    module: {
        rules,
    },
    plugins: [
        ...plugins,
        new MiniCssExtractPlugin({
            filename: isDevelopment ? "[name].css" : "[name].[hash].css",
            chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
        }),
    ],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss"],
    },
    devtool: "inline-source-map",
};
