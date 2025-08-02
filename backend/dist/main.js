"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const promClient = require("prom-client");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const configService = app.get(config_1.ConfigService);
        const port = configService.get('PORT') || 3000;
        if (promClient.register.getMetricsAsArray().length === 0) {
            promClient.collectDefaultMetrics();
        }
        app.use('/metrics', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.set('Content-Type', promClient.register.contentType);
            const metrics = yield promClient.register.metrics();
            res.end(metrics);
        }));
        yield app.listen(port, '0.0.0.0');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map