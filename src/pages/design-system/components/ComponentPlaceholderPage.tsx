import PageHeader from "../../../components/docs/PageHeader";

type ComponentPlaceholderPageProps = {
  title: string;
  description: string;
};

export default function ComponentPlaceholderPage({
  title,
  description,
}: ComponentPlaceholderPageProps) {
  return (
    <div className="space-y-16">
      <PageHeader title={title} description={description} />

      <section>
        <div className="bg-white p-6">
          <h2 className="mb-3 text-xl font-semibold text-[var(--neutral-900)]">
            组件规范待补齐
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-[var(--neutral-600)]">
            当前页面已接入导航和路由，后续会按照真实 Vue 3 组件、Figma 组件状态和网页规范示例补齐类型、尺寸、状态、使用原则与代码示例。
          </p>
        </div>
      </section>
    </div>
  );
}
