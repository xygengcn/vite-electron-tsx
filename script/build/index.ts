/**
 * electron 打包
 */
import { rollup } from 'rollup';
import ORA from 'ora'; // 命令行：loading插件
import rollupTasks from '../rollupTasks';
import { green, red } from 'chalk'; // 打印字体颜色

const spinner = ORA({ text: 'Electron项目打包中...\n', color: 'green' });
spinner.start();
const taskRollup = rollupTasks.map((item) => {
  return rollup(item).then((build) => {
    build.write(item.output);
  });
});
Promise.all(taskRollup)
  .then(() => {
    console.log(green('Electron项目编译成功\n'));
  })
  .catch((err) => {
    console.log(red('Electron项目编译失败：'), err);
  })
  .finally(() => {
    spinner.stop();
  });
