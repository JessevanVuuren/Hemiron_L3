import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import 'chartjs-adapter-date-fns';
import {DropdownChangeEvent} from "primeng/dropdown";
import {Action} from "../../../shared/models/action.model";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  public actions: Action[] = [];
  public services: string[] = ["All", "Serverless", "K8S", "Postgres", "S3", "VPS"];
  public service: string = "All";
  public activeTabIndex: number = 0;

  protected chartData: any[] = [];
  protected chartLabels: string[] = [];
  protected chartOptions: any = {};

  ngOnInit() {
    this.updateChartData();
  }

  ngAfterViewInit(): void {
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChartData();
  }

  updateService(event: DropdownChangeEvent) {
      this.updateChartData();
  }

  tabChanged(event: any) {
    this.activeTabIndex = event.index;
    this.updateChartData();
  }

  updateChartData() {
    switch (this.activeTabIndex) {
      case 0: // Last 24 Hours
        this.changeChartToLast24Hours();
        break;
      case 1: // This Month
        this.changeChartToThisMonth();
        break;
      case 2: // Last Year
        this.changeChartToLastYear();
        break;
      case 3: // All Time
        this.changeChartToAllTime();
        break;
      default:
        break;
    }
  }


  changeChartToLast24Hours() {
    this.chartData = [
      { data: this.getTotalUsagePerHourLast24Hours(this.service, 'cpuUsage'), label: 'CPU Usage', stack: 'stack 0' },
      { data: this.getTotalUsagePerHourLast24Hours(this.service, 'ioUsage'), label: 'IO Usage', stack: 'stack 0' },
      { data: this.getTotalUsagePerHourLast24Hours(this.service, 'storage'), label: 'Storage', stack: 'stack 0' },
      { data: this.getTotalUsagePerHourLast24Hours(this.service, 'networkTraffic'), label: 'Network Traffic', stack: 'stack 0' }
    ];

    this.chartLabels = Array.from({length: 24}, (_, i) => {
      const hour = new Date();
      hour.setHours(hour.getHours() - 24 + i);
      const day = hour.toLocaleString('nl-NL', {weekday: 'long', timeZone: 'Europe/Amsterdam'});
      return `${day}, ${hour.toLocaleString('nl-NL', {hour: 'numeric', hour12: false, timeZone: 'Europe/Amsterdam'})}`;
    });

    this.chartOptions = {
      responsive: true,
      scales: {
        x: {
          title: {
            type: 'category',
            display: true,
            text: 'Dag, Tijd (Uur)'
          }
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Prijs (Euro)'
          },
          stacked: true
        },
      },
      plugins: {
        title: {
          display: true,
          text: `${this.service} Usage`
        }
      }
    };
  }

  changeChartToThisMonth() {
    this.chartData = [
      { data: this.getTotalUsagePerDayThisMonth(this.service, 'cpuUsage'), label: 'CPU Usage', stack: 'stack 0' },
      { data: this.getTotalUsagePerDayThisMonth(this.service, 'ioUsage'), label: 'IO Usage', stack: 'stack 0' },
      { data: this.getTotalUsagePerDayThisMonth(this.service, 'storage'), label: 'Storage', stack: 'stack 0' },
      { data: this.getTotalUsagePerDayThisMonth(this.service, 'networkTraffic'), label: 'Network Traffic', stack: 'stack 0' }
    ];

    this.chartLabels = Array.from({length: this.getDaysInCurrentMonth()}, (_, i) => {
      const day = new Date(new Date().getFullYear(), new Date().getMonth(), i + 1);
      return day.toLocaleDateString('nl-NL', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Amsterdam'});
    });

    this.chartOptions = {
      responsive: true,
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Day'
          }
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Price (Euro)'
          },
          stacked: true
        },
      },
      plugins: {
        title: {
          display: true,
          text: `${this.service} Usage`
        }
      }
    };
  }

  getDaysInCurrentMonth(): number {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  changeChartToLastYear() {
    this.chartData = [
      { data: this.getTotalUsagePerMonthLastYear(this.service, 'cpuUsage'), label: 'CPU Usage', stack: 'stack 0' },
      { data: this.getTotalUsagePerMonthLastYear(this.service, 'ioUsage'), label: 'IO Usage', stack: 'stack 0' },
      { data: this.getTotalUsagePerMonthLastYear(this.service, 'storage'), label: 'Storage', stack: 'stack 0' },
      { data: this.getTotalUsagePerMonthLastYear(this.service, 'networkTraffic'), label: 'Network Traffic', stack: 'stack 0' }
    ];

    this.chartLabels = Array.from({length: 12}, (_, i) => {
      return new Date(new Date().getFullYear(), i, 1).toLocaleDateString('default', {month: 'long'});
    });

    this.chartOptions = {
      responsive: true,
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Price (Euro)'
          },
          stacked: true
        },
      },
      plugins: {
        title: {
          display: true,
          text: `${this.service} Usage`
        }
      }
    };
  }

  changeChartToAllTime() {
    this.chartData = [
      {data: this.getTotalUsagePerMonthAllTime(this.service, 'cpuUsage'), label: 'CPU Usage', stack: 'stack 0'},
      {data: this.getTotalUsagePerMonthAllTime(this.service, 'ioUsage'), label: 'IO Usage', stack: 'stack 0'},
      {data: this.getTotalUsagePerMonthAllTime(this.service, 'storage'), label: 'Storage', stack: 'stack 0'},
      {data: this.getTotalUsagePerMonthAllTime(this.service, 'networkTraffic'), label: 'Network Traffic', stack: 'stack 0'}
    ];

    const startYear = this.actions.reduce((min, action) => action.performedAt.getFullYear() < min ? action.performedAt.getFullYear() : min, new Date().getFullYear());
    const endYear = new Date().getFullYear();
    const totalMonths = (endYear - startYear) * 12 + (new Date().getMonth() + 1);

    this.chartLabels = Array.from({ length: totalMonths }, (_, i) => {
      const year = startYear + Math.floor(i / 12);
      const month = i % 12;
      return new Date(year, month, 1).toLocaleDateString('default', { month: 'long', year: 'numeric' });
    });

    this.chartOptions = {
      responsive: true,
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Price (Euro)'
          },
          stacked: true
        },
      },
      plugins: {
        title: {
          display: true,
          text: `${this.service} Usage`
        }
      }
    };
  }

  getTotalUsagePerHourLast24Hours(service: string, usageType: string): number[] {
    const usagePerHour: number[] = new Array(24).fill(0);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    for (const action of this.actions) {
      if (!(action.performedAt >= twentyFourHoursAgo)) {
        continue;
      }

      if (action.service === service || this.service === 'All') {
        const hour = action.performedAt.getHours();
        usagePerHour[hour] += action[usageType];
      }
    }

    return usagePerHour;
  }

  getTotalUsagePerDayThisMonth(service: string, usageType: string): number[] {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    const usagePerDay: number[] = new Array(daysInCurrentMonth).fill(0);
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    for (const action of this.actions) {
      if (action.performedAt < startOfMonth || action.performedAt > endOfMonth) {
        continue;
      }

      if (action.service === service || this.service === 'All') {
        const day = action.performedAt.getDay();
        usagePerDay[day] += action[usageType];
      }
    }

    return usagePerDay;
  }

  getTotalUsagePerMonthLastYear(service: string, usageType: string): number[] {
    const usagePerMonth: number[] = new Array(12).fill(0);
    const currentYear = new Date().getFullYear();

    for (const action of this.actions) {
      if (action.performedAt.getFullYear() !== currentYear) {
        continue;
      }

      if (action.service === service || this.service === 'All') {
        const month = action.performedAt.getMonth();
        usagePerMonth[month] += action[usageType];
      }
    }

    return usagePerMonth;
  }

  getTotalUsagePerMonthAllTime(service: string, usageType: string): number[] {
    let yearArray: number[] = new Array(new Date().getFullYear() - 2000).fill(0);
    let emptyArray: number[] = new Array(12).fill(0);

    let usagePerMonthPerYear: number[][] = yearArray.map(() => emptyArray);

    for (const action of this.actions) {
      if (action.service === service || this.service === 'All') {
        const year = action.performedAt.getFullYear() - 2000 - 1;
        const month = action.performedAt.getMonth();

        usagePerMonthPerYear[year][month] += action[usageType];
      }
    }

    usagePerMonthPerYear = usagePerMonthPerYear.filter(yearData => yearData === emptyArray);

    let usagePerMonthPerYearArray: number[] = [];
    for (const yearData of usagePerMonthPerYear) {
      usagePerMonthPerYearArray = usagePerMonthPerYearArray.concat(yearData);
    }

    return usagePerMonthPerYearArray;
  }
}
