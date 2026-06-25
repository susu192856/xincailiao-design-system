import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Avatar } from "../../../components/ui/Avatar";
import { Badge } from "../../../components/ui/Badge";
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
        <SectionHeading eyebrow="Variants" title="基础类型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="尺寸">
            <div className="flex items-center gap-5">
              <Avatar name="王工" size="sm" />
              <Avatar name="李明" size="md" />
              <Avatar name="张婷" size="lg" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">列表中使用 28px，顶栏和表单摘要使用 36px，详情头部可使用 48px。</p>
          </ExampleCard>
          <ExampleCard title="状态点">
            <div className="flex items-center gap-5">
              <Avatar name="在线用户" status="online" />
              <Avatar name="处理中" status="busy" />
              <Avatar name="离线用户" status="offline" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">状态点只表示即时在线状态，不表示权限等级或审核状态。</p>
          </ExampleCard>
          <ExampleCard title="带消息徽标">
            <div className="flex items-center gap-6">
              <Badge count={6} tone="product">
                <Avatar name="赵" size="md" />
              </Badge>
              <Badge dot tone="danger">
                <Avatar name="系统" size="md" />
              </Badge>
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">徽标用于待办数量或重要提醒，避免和状态点同时表达同一含义。</p>
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
                    <Avatar name={member.name} status={member.status} size="sm" />
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
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "后台顶栏默认使用 36px 头像，表格和列表中使用 28px，详情页头部可使用 48px。",
            "无图片时显示姓名首字；中文姓名取首字，英文姓名取首字母并大写。",
            "状态点只用于在线、忙碌、离线等即时状态，不用于角色、权限、审核状态。",
            "头像与徽标组合时，徽标表达待办数量或关键提醒，避免和在线状态混用。",
          ]}
        />
      </section>
    </div>
  );
}
