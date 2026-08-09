"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Power, Server, Terminal } from "lucide-react";

import { useAuth } from "@/components/auth-context";
import { fetchWithAuth } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/toast-context";

interface Instance {
  id: string;
  name: string;
  type: string;
  status: string;
  ipAddress: string | null;
  region: string;
  createdAt: string;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-border py-2.5">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="font-mono text-[13px]">{value}</span>
    </div>
  );
}

function InstanceSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="mt-6 space-y-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="mt-6 flex gap-2">
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="size-8 rounded-lg" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { toast } = useToast();

  // Fetch instances on mount and poll every 5 seconds
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated) {
      const fetchInstances = () => {
        fetchWithAuth(`/instances`)
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setInstances(data);
            }
          })
          .catch(console.error)
          .finally(() => setLoaded(true));
      };

      fetchInstances();
      const interval = setInterval(fetchInstances, 5000); // Poll for simulation updates
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, loading, router]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied SSH command", "info");
  };

  return (
    <PageShell>
      <PageHeader
        title="Clusters"
        description="Manage your active GPU instances."
      />

      {loading || !loaded ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((card) => (
            <InstanceSkeleton key={card} />
          ))}
        </div>
      ) : instances.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card px-6 py-16 text-center">
          <Server className="size-5 text-muted-foreground" />
          <div className="space-y-1.5">
            <p className="text-[14px]">No active instances</p>
            <p className="text-[13px] text-muted-foreground">
              Purchase a GPU configuration to see it here.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-1"
            onClick={() => router.push("/nvidia")}
          >
            Browse GPUs
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {instances.map((instance) => (
            <div
              key={instance.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-mono text-[13px]">
                    {instance.name}
                  </p>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    {instance.type}
                  </p>
                </div>
                <Badge
                  variant={
                    instance.status === "RUNNING" ? "success" : "warning"
                  }
                  className="shrink-0 lowercase"
                >
                  {instance.status}
                </Badge>
              </div>

              <div className="mt-5">
                <DetailRow label="Region" value={instance.region} />
                <DetailRow
                  label="IP address"
                  value={instance.ipAddress || "Assigning…"}
                />
              </div>

              <div className="mt-5 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  disabled={!instance.ipAddress}
                  onClick={() =>
                    copyToClipboard(`ssh root@${instance.ipAddress}`)
                  }
                >
                  <Terminal />
                  SSH
                </Button>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Stop instance"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Power className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
