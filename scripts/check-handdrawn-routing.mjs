#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { routeStyle } from './route-style.mjs';
import { checkHanddrawnDeck } from './check-handdrawn-deck.mjs';

const cases = [
  ['用黑白橙手绘做这组图', 'Handdrawn Insight', 'selected'],
  ['像上次 PG 那套', 'Handdrawn Insight', 'selected'],
  ['Paul Graham 商业文章的七个独立观点和启发', 'Handdrawn Insight', 'recommend'],
  ['作者观点分析，要保留完整因果和连续叙事', 'Longform Reader', 'choose'],
  ['作者观点分析，要保留完整因果和连续叙事，自动选择', 'Longform Reader', 'recommend'],
  ['用 Swiss System 呈现 Paul Graham 的观点和启发', 'Swiss System', 'selected'],
  ['不要手绘观点解读，用长文阅读模板呈现作者观点', 'Longform Reader', 'selected'],
  ['作者访谈启发的实测操作教程，真实截图和操作步骤', 'Proof Lab', 'recommend'],
  ['手绘观点解读和长文阅读模板给我选项', 'Handdrawn Insight', 'choose'],
];
for (const [input, system, mode] of cases) {
  const r = routeStyle(input);
  assert.equal(r.visualSystem, system, input);
  assert.equal(r.selectionMode, mode, input);
  if (mode === 'choose') {
    assert.ok(r.options.length >= 2 && r.options.length <= 3, input);
    assert.equal(new Set(r.options.map(x => x.visualSystem)).size, r.options.length);
  }
}
assert.notEqual(routeStyle('Paul Graham').visualSystem, 'Handdrawn Insight');
assert.equal(routeStyle('请给我选项').visualSystem, routeStyle('请给我选项').options[0].visualSystem);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'keke-handdrawn-'));
try {
  const scaffold = path.join(tmp, 'scaffold');
  const made = spawnSync(process.execPath, ['scripts/create-task.mjs', '--dir', scaffold, '--name', 'test', '--system', '手绘观点解读'], {encoding:'utf8'});
  assert.equal(made.status, 0, made.stderr);
  assert.match(fs.readFileSync(path.join(scaffold, 'BRIEF.md'), 'utf8'), /renderMode: imagegen-full-card/);
  fs.mkdirSync(path.join(tmp, 'images'));
  fs.mkdirSync(path.join(tmp, 'assets'));
  const route = routeStyle('用手绘观点解读');
  fs.writeFileSync(path.join(tmp, 'BRIEF.md'), '## Route Decision\n' + Object.entries(route).filter(([k]) => !['options','keywords'].includes(k)).map(([k,v]) => `- ${k}: ${v}`).join('\n') + '\n\n## Proposal Confirmation\n- status: confirmed\n');
  for (const name of ['QA.md','assets/SOURCES.md','assets/IMAGE_REQUESTS.md','prompt.md']) fs.writeFileSync(path.join(tmp,name), 'Synthetic test fixture; not production approval.');
  fs.writeFileSync(path.join(tmp,'caption.md'), '## 标题\n如何选择早期客户\n## 正文\n早期客户的决策速度会影响产品验证。\n## 标签\n#创业 #客户 #商业 #阅读 #产品\n');
  const data = fs.readFileSync('assets/handdrawn-insight/reference-cover.png');
  fs.writeFileSync(path.join(tmp,'images/cover.png'),data);
  const manifest = {visualSystem:'Handdrawn Insight',renderMode:'imagegen-full-card',captionFile:'caption.md',cards:[{file:'images/cover.png',role:'cover',title:'测试封面',sourceAnchor:'Synthetic fixture',promptFile:'prompt.md',review:{sha256:crypto.createHash('sha256').update(data).digest('hex'),textCorrect:true,attributionCorrect:true,portraitCorrect:true,readable:true,styleConsistent:true}}]};
  const save = () => fs.writeFileSync(path.join(tmp,'deck-manifest.json'),JSON.stringify(manifest));
  save();
  assert.deepEqual(checkHanddrawnDeck(tmp), []);
  const dispatch = spawnSync(process.execPath,['scripts/run-quality-gates.mjs',tmp],{encoding:'utf8'});
  assert.equal(dispatch.status,0,dispatch.stdout + dispatch.stderr);
  assert.match(dispatch.stdout,/Handdrawn structural checks passed/);
  manifest.cards[0].review.portraitCorrect=false; save();
  assert.ok(checkHanddrawnDeck(tmp).some(x => x.includes('portraitCorrect')));
  manifest.cards[0].review.portraitCorrect=true;
  manifest.cards[0].review.sha256='stale'; save();
  assert.ok(checkHanddrawnDeck(tmp).some(x => x.includes('stale')));
  manifest.cards[0].review.sha256=crypto.createHash('sha256').update(data).digest('hex'); save();
  fs.writeFileSync(path.join(tmp,'images/old.png'), data);
  assert.ok(checkHanddrawnDeck(tmp).some(x => x.includes('Unselected image')));
  fs.unlinkSync(path.join(tmp,'images/old.png'));
  fs.unlinkSync(path.join(tmp,'assets/SOURCES.md'));
  assert.ok(checkHanddrawnDeck(tmp).some(x => x.includes('SOURCES')));
} finally { fs.rmSync(tmp,{recursive:true,force:true}); }
console.log('Handdrawn routing, scaffold, raster gate and failure cases passed.');
