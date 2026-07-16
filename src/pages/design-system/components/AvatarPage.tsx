import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Avatar, defaultAvatarImages } from "../../../components/ui/Avatar";
import { Tag } from "../../../components/ui/Tag";

const members = [
  { name: "王工", role: "材料工程师", status: "online" as const },
  { name: "李明", role: "数据运营", status: "busy" as const },
  { name: "张婷", role: "空间管理员", status: "offline" as const },
];

export default function AvatarPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="头像" description="头像用于表达用户、组织、角色或系统身份，常见于后台顶栏、成员列表、审批记录和协作流。" />

      <section>
        <SectionHeading eyebrow="Variants" title="类型与形状" description="先选择内容类型，再根据使用场景选择圆形或正方形；类型与形状是两个独立属性。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="默认头像（default）">
            <div className="flex items-center gap-4"><Avatar name="默认用户" variant="default" size="lg" /></div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">身份未知、匿名或不适合分配图片时，使用统一的灰色人物占位。</p>
          </ExampleCard>
          <ExampleCard title="图片头像（image）">
            <div className="flex flex-wrap items-center gap-3">
              {defaultAvatarImages.map((src, index) => <Avatar key={src} name={`图片头像 ${index + 1}`} src={src} variant="image" size="lg" />)}
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">后台实名用户未上传头像时，使用 image 类型并按用户唯一标识从 10 张图片中稳定分配；用户上传图片后由 src 覆盖。</p>
          </ExampleCard>
          <ExampleCard title="名字头像（initial）">
            <div className="flex items-center gap-4">
              <Avatar name="王工" variant="initial" size="lg" />
              <Avatar name="Alice" variant="initial" size="lg" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">中文两字名显示全名，三字及以上取末两字；英文取前两个词的首字母。底色由完整姓名稳定映射。</p>
          </ExampleCard>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="圆形（circle）— 人员默认">
            <div className="flex items-center gap-4">
              <Avatar name="默认用户" variant="default" shape="circle" />
              <Avatar name="图片用户" src={defaultAvatarImages[0]} shape="circle" />
              <Avatar name="王工" variant="initial" shape="circle" />
            </div>
          </ExampleCard>
          <ExampleCard title="正方形（square）— 组织或系统">
            <div className="flex items-center gap-4">
              <Avatar name="默认组织" variant="default" shape="square" />
              <Avatar name="组织图片" src={defaultAvatarImages[1]} shape="square" />
              <Avatar name="材料中心" variant="initial" shape="square" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">图片素材统一由组件容器裁切；即使源图片自带圆角，也不得改变正方形头像的外轮廓。</p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="尺寸与在线状态" description="尺寸遵循 4px 网格。组件只开放四档命名尺寸，避免设计稿中出现任意值。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="尺寸">
            <div className="flex items-center gap-5">
              <Avatar name="王工" size="sm" />
              <Avatar name="李明" size="md" />
              <Avatar name="张婷" size="lg" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">sm 28px 用于列表，md 36px 用于顶栏，lg 48px 用于详情头部，xl 64px 用于个人资料。特殊紧凑场景不得小于 24px。</p>
          </ExampleCard>
          <ExampleCard title="在线状态">
            <div className="flex items-center gap-5">
              <Avatar name="在线用户" status="online" />
              <Avatar name="处理中" status="busy" />
              <Avatar name="离线用户" status="offline" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">状态点只表示即时在线状态，不表示权限等级或审核状态。</p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台场景" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="顶栏用户入口">
            <div className="flex items-center justify-between bg-white p-4">
              <div>
                <p className="text-sm text-[var(--text-primary)]">材料数据工作台</p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">当前空间：华东材料数据空间</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-[var(--text-primary)]">王工</p>
                  <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">管理员</p>
                </div>
                <Avatar name="王工" status="online" />
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="成员列表">
            <div className="divide-y divide-[var(--neutral-100)] bg-white">
              {members.map((member) => (
                <div key={member.name} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} fallbackKey={member.name} variant="image" status={member.status} size="sm" />
                    <div>
                      <p className="text-sm text-[var(--text-primary)]">{member.name}</p>
                      <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">{member.role}</p>
                    </div>
                  </div>
                  <Tag variant={member.status === "online" ? "success" : member.status === "busy" ? "warning" : "neutral"} size="sm">
                    {member.status === "online" ? "在线" : member.status === "busy" ? "忙碌" : "离线"}
                  </Tag>
                </div>
              ))}
            </div>
          </ExampleCard>
          <ExampleCard title="审批记录">
            <div className="space-y-4 bg-white">
              <div className="flex gap-3">
                <Avatar name="审核员" size="sm" />
                <div className="min-w-0">
                  <p className="text-sm text-[var(--text-primary)]">审核员提交审批意见</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">字段映射已通过，建议补充数据来源证明。</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Avatar name="系统" size="sm" status="busy" />
                <div className="min-w-0">
                  <p className="text-sm text-[var(--text-primary)]">系统自动校验中</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">正在检查材料牌号、批次和权限范围。</p>
                </div>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="权限身份">
            <div className="grid grid-cols-1 gap-3 bg-white md:grid-cols-2">
              {["空间管理员", "数据提供方", "数据使用方", "访客"].map((role) => (
                <div key={role} className="flex items-center gap-3 bg-[var(--neutral-50)] p-3">
                  <Avatar name={role} size="sm" />
                  <span className="text-sm text-[var(--text-body)]">{role}</span>
                </div>
              ))}
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Composition" title="身份信息组合" description="头像承担快速识别，姓名和角色信息承担准确识别；两者不能互相替代。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="横向组合 — 列表与顶栏">
            <div className="flex items-center gap-3 bg-white p-3">
              <Avatar name="王工" fallbackKey="user-1001" variant="image" size="lg" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--text-primary)]">王工</p>
                <p className="mt-1 truncate text-xs text-[var(--text-tertiary)]">材料工程师</p>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="纵向组合 — 个人入口">
            <div className="flex flex-col items-center gap-3 bg-white p-3 text-center">
              <Avatar name="李明" fallbackKey="user-1002" variant="image" size="xl" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">李明</p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">数据运营</p>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="群组 — 限量展示">
            <div className="flex items-center bg-white p-3">
              {defaultAvatarImages.slice(0, 3).map((src, index) => (
                <Avatar key={src} name={`协作成员 ${index + 1}`} src={src} size="md" className={[index ? "-ml-2" : "", "ring-2 ring-white"].join(" ")} />
              ))}
              <span className="ml-3 text-sm text-[var(--text-secondary)]">另有 7 人</span>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "后台顶栏默认使用 36px 头像，表格和列表中使用 28px，详情页头部可使用 48px。",
            "尺寸遵循 4px 网格；组件只使用 sm、md、lg、xl 四档，特殊紧凑场景不得小于 24px，不在业务页面自由输入尺寸。",
            "无图片且身份明确时可使用名字头像；中文两字名显示全名，三字及以上取末两字，英文取前两个词的首字母。头像旁仍需显示完整姓名，不能把缩写作为唯一身份标识。",
            "default 是灰色人物占位；后台未上传头像的实名用户使用 image，并按 fallbackKey 从 10 张图片中稳定映射。",
            "用户上传自定义头像后使用 src 覆盖默认分配；删除自定义头像后恢复该用户原有的稳定默认头像。",
            "人员默认使用圆形头像；组织、角色或系统身份可使用正方形。同一列表中保持形状语义一致。",
            "状态点只用于在线、忙碌、离线等即时状态，不用于角色、权限、审核状态。",
            "身份组合中的姓名使用半粗字重和 neutral-900；群组叠放头像增加 2px 白色描边，避免相邻图片边界混合。",
            "头像不叠加消息徽标；待办数量和提醒放在对应入口或列表项上，避免与在线状态混淆。",
          ]}
        />
      </section>
    </div>
  );
}
