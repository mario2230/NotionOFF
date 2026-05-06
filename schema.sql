CREATE TABLE `usuarios`(
    `id_usuario` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha_hash` VARCHAR(255) NOT NULL,
    `criado_em` DATETIME NULL DEFAULT CURRENT_TIMESTAMP());
ALTER TABLE
    `usuarios` ADD UNIQUE `usuarios_email_unique`(`email`);
CREATE TABLE `paginas`(
    `id_pagina` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `titulo` VARCHAR(255) NOT NULL,
    `id_usuario` INT NOT NULL,
    `criado_em` DATETIME NULL DEFAULT CURRENT_TIMESTAMP());
ALTER TABLE
    `paginas` ADD INDEX `paginas_id_usuario_index`(`id_usuario`);
CREATE TABLE `blocos`(
    `id_bloco` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_pagina` INT NOT NULL,
    `tipo` VARCHAR(255) NOT NULL,
    `conteudo` VARCHAR(255) NULL,
    `ordem` INT NULL,
    `id_pai` INT NULL,
    `feito` BOOLEAN NULL,
    `criado_em` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(), `atualizado_em` DATETIME NULL DEFAULT CURRENT_TIMESTAMP());
ALTER TABLE
    `blocos` ADD INDEX `blocos_id_pagina_index`(`id_pagina`);
ALTER TABLE
    `blocos` ADD INDEX `blocos_id_pai_index`(`id_pai`);
ALTER TABLE
    `blocos` ADD CONSTRAINT `blocos_id_pagina_foreign` FOREIGN KEY(`id_pagina`) REFERENCES `paginas`(`id_pagina`);
ALTER TABLE
    `blocos` ADD CONSTRAINT `blocos_id_pai_foreign` FOREIGN KEY(`id_pai`) REFERENCES `blocos`(`id_bloco`);
ALTER TABLE
    `paginas` ADD CONSTRAINT `paginas_id_usuario_foreign` FOREIGN KEY(`id_usuario`) REFERENCES `usuarios`(`id_usuario`);