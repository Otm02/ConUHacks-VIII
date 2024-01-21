from flask import Flask, render_template, jsonify
import pandas as pd
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/all', methods=['GET'])
def fetchData():
    # add column names to data: reservation_date, appointment_date, vehicle_type and sort by reservation_date
    data = pd.read_csv(
        "./datafile.csv",
        header=None,
        names=["reservation_date", "appointment_date", "vehicle_type"],
    )

    data = data.sort_values(by="reservation_date")

    schedule_start_date = datetime.strptime("2022-10-01", "%Y-%m-%d").date()
    schedule_end_date = datetime.strptime("2022-11-30", "%Y-%m-%d").date()


    class Task:
        def __init__(self, start_time, end_time, vehicle_type):
            self.start_time = start_time
            self.end_time = end_time
            self.vehicle_type = vehicle_type


    class Day:
        def __init__(self, date):
            self.date = date
            self.tasks = []
            self.walk_in_reserved = {
                "compact": False,
                "medium": False,
                "full-size": False,
                "class 1 truck": False,
                "class 2 truck": False,
            }
            self.service_info = {
                "compact": {"charge": 150, "serviced": 0, "rejected": 0},
                "medium": {"charge": 150, "serviced": 0, "rejected": 0},
                "full-size": {"charge": 150, "serviced": 0, "rejected": 0},
                "class 1 truck": {"charge": 250, "serviced": 0, "rejected": 0},
                "class 2 truck": {"charge": 700, "serviced": 0, "rejected": 0},
            }
            self.revenue = 0
            self.loss = 0

        def add_reservation(self, start_time, end_time, vehicle_type):
            # Check if the dates are within the valid range and times and if the walk-in is reserved
            if not (
                (schedule_start_date <= start_time.date() <= schedule_end_date)
                and (schedule_start_date <= end_time.date() <= schedule_end_date)
                and (7 <= start_time.hour <= 19)
                and (7 <= end_time.hour <= 19)
            ) or (start_time == end_time and self.walk_in_reserved[vehicle_type]):
                self.loss += self.service_info[vehicle_type]["charge"]
                self.service_info[vehicle_type]["rejected"] += 1
                return False

            if start_time < end_time:
                concurrent_apt = 0
                for task in self.tasks:
                    if (start_time < task.end_time) and (end_time > task.start_time):
                        concurrent_apt += 1
                    if concurrent_apt >= 5:
                        self.loss += self.service_info[vehicle_type]["charge"]
                        self.service_info[vehicle_type]["rejected"] += 1
                        return False

            self.tasks.append(Task(start_time, end_time, vehicle_type))
            if start_time == end_time:
                self.walk_in_reserved[vehicle_type] = True

            self.revenue += self.service_info[vehicle_type]["charge"]
            self.service_info[vehicle_type]["serviced"] += 1

            return True


    class Schedule:
        def __init__(self):
            self.days = []
            for i in range((schedule_end_date - schedule_start_date).days + 1):
                self.days.append(Day(schedule_start_date + timedelta(days=i)))

        def process_reservations(self, data):
            for index, row in data.iterrows():
                apt_start_date = datetime.strptime(
                    row["appointment_date"], "%Y-%m-%d %H:%M"
                )
                vehicle_type = row["vehicle_type"]
                duration = 30
                if vehicle_type == "class 1 truck":
                    duration = 60
                elif vehicle_type == "class 2 truck":
                    duration = 120

                apt_end_date = apt_start_date + timedelta(minutes=duration)

                # Process the reservation
                date_index = (apt_start_date.date() - schedule_start_date).days

                self.days[date_index].add_reservation(
                    apt_start_date, apt_end_date, vehicle_type
                )

            # remove days with no reservations
            self.days = [day for day in self.days if day.tasks]

        # plot schedule using matplotlib
        def print_schedule(self):
            import matplotlib.pyplot as plt
            
            fig, ax = plt.subplots(figsize=(10, 10))
            ax.set_title("Schedule")
            ax.set_xlabel("Days")
            ax.set_ylabel("Hours")

            for day in self.days:
                for task in day.tasks:
                    vehicle_type = task.vehicle_type
                    color_code = "blue"
                    if vehicle_type == "compact":
                        color_code = "blue"
                    elif vehicle_type == "medium":
                        color_code = "green"
                    elif vehicle_type == "full-size":
                        color_code = "red"
                    elif vehicle_type == "class 1 truck":
                        color_code = "yellow"
                    elif vehicle_type == "class 2 truck":
                        color_code = "orange"

                    ax.plot(
                        [day.date, day.date],
                        [task.start_time.hour, task.end_time.hour],
                        color=color_code,
                        linewidth=5,
                    )

            plt.show()

        def print_stats(self):
            # for day in self.days:
            #     print(day.date)
            #     print("Revenue: ", day.revenue)
            #     print("Loss: ", day.loss)
            #     print("Service Info: ", day.service_info)
            #     print("\n")
            jsonData = []
            jsonData.append({"Total Revenue": [day.revenue for day in self.days]})
            jsonData.append({"Total Loss": [day.loss for day in self.days]})
            jsonData.append({"Total compact serviced": [day.service_info["compact"]["serviced"] for day in self.days]})
            jsonData.append({"Total medium serviced": [day.service_info["medium"]["serviced"] for day in self.days]})
            jsonData.append({"Total full-size serviced": [day.service_info["full-size"]["serviced"] for day in self.days]})
            jsonData.append({"Total class 1 truck serviced": [day.service_info["class 1 truck"]["serviced"] for day in self.days]})
            jsonData.append({"Total class 2 truck serviced": [day.service_info["class 2 truck"]["serviced"] for day in self.days]})
            jsonData.append({"Total compact rejected": [day.service_info["compact"]["rejected"] for day in self.days]})
            jsonData.append({"Total medium rejected": [day.service_info["medium"]["rejected"] for day in self.days]})
            jsonData.append({"Total full-size rejected": [day.service_info["full-size"]["rejected"] for day in self.days]})
            jsonData.append({"Total class 1 truck rejected": [day.service_info["class 1 truck"]["rejected"] for day in self.days]})
            jsonData.append({"Total class 2 truck rejected": [day.service_info["class 2 truck"]["rejected"] for day in self.days]})
            print(jsonData)
            return jsonData


    schedule = Schedule()
    schedule.process_reservations(data)
    jsonData2 = schedule.print_stats()
    return jsonify(jsonData2), 200
    # schedule.print_schedule()
    #To print the type of error...

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('127.0.0.1', 5100, app)
